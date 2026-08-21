import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";

const sql = neon(process.env.DATABASE_URL);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      unit_id,
      unit_name,
      full_name,
      mobile_number,
      email,
      bid_amount,
      message,
    } = body;

    // Validate required fields
    if (!unit_id) {
      return Response.json(
        { error: "Motorcycle unit is required." },
        { status: 400 }
      );
    }

    if (!full_name || !mobile_number || !bid_amount) {
      return Response.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    // Validate bid amount
    const amount = Number(bid_amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      return Response.json(
        { error: "Invalid bid amount." },
        { status: 400 }
      );
    }

    // Save bid to Neon
    const result = await sql`
      INSERT INTO bids (
        unit_id,
        full_name,
        mobile_number,
        email,
        bid_amount,
        message
      )
      VALUES (
        ${unit_id},
        ${full_name.trim()},
        ${mobile_number.trim()},
        ${email?.trim() || null},
        ${amount},
        ${message?.trim() || null}
      )
      RETURNING id, created_at, status
    `;

    const bid = result[0];

    // Send notification email
    const emailResult = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: [process.env.BID_NOTIFICATION_EMAIL],
      replyTo: email || undefined,
      subject: `🔔 New Motorcycle Bid - ${unit_name || "CCFI Unit"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto;">
          
          <div style="background:#111827; padding:25px; color:white;">
            <h1 style="margin:0;">CCFI Bidding Portal</h1>
            <p style="margin-bottom:0;">New Bid Received</p>
          </div>

          <div style="padding:25px; border:1px solid #ddd;">
            
            <h2 style="color:#dc2626;">
              🔔 NEW BID RECEIVED
            </h2>

            <h3>Motorcycle Information</h3>

            <table style="width:100%; border-collapse:collapse;">
              <tr>
                <td style="padding:8px; font-weight:bold;">Unit</td>
                <td style="padding:8px;">${escapeHtml(unit_name || "N/A")}</td>
              </tr>

              <tr>
                <td style="padding:8px; font-weight:bold;">Bid Amount</td>
                <td style="padding:8px;">
                  ₱${amount.toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                  })}
                </td>
              </tr>

              <tr>
                <td style="padding:8px; font-weight:bold;">Status</td>
                <td style="padding:8px;">NEW</td>
              </tr>
            </table>

            <h3>Bidder Information</h3>

            <table style="width:100%; border-collapse:collapse;">
              <tr>
                <td style="padding:8px; font-weight:bold;">Full Name</td>
                <td style="padding:8px;">${escapeHtml(full_name)}</td>
              </tr>

              <tr>
                <td style="padding:8px; font-weight:bold;">Mobile Number</td>
                <td style="padding:8px;">${escapeHtml(mobile_number)}</td>
              </tr>

              <tr>
                <td style="padding:8px; font-weight:bold;">Email</td>
                <td style="padding:8px;">${escapeHtml(email || "N/A")}</td>
              </tr>

              <tr>
                <td style="padding:8px; font-weight:bold;">Message</td>
                <td style="padding:8px;">
                  ${escapeHtml(message || "No message")}
                </td>
              </tr>
            </table>

            <hr style="margin:25px 0;">

            <p>
              <strong>Bid ID:</strong> ${bid.id}
            </p>

            <p>
              <strong>Submitted:</strong>
              ${new Date(bid.created_at).toLocaleString("en-PH")}
            </p>

            <p style="color:#6b7280;">
              This is an automatic notification from the CCFI Bidding Portal.
            </p>

          </div>
        </div>
      `,
      text: `
CCFI BIDDING PORTAL - NEW BID RECEIVED

Motorcycle: ${unit_name || "N/A"}
Bid Amount: ₱${amount.toLocaleString("en-PH")}

Bidder:
Name: ${full_name}
Mobile: ${mobile_number}
Email: ${email || "N/A"}

Message:
${message || "No message"}

Bid ID: ${bid.id}
Status: NEW
      `,
    });

    // Database was successful even if email has an issue
    if (emailResult.error) {
      console.error("Email notification failed:", emailResult.error);

      return Response.json({
        success: true,
        bid,
        emailSent: false,
        message: "Bid submitted successfully, but email notification failed.",
      });
    }

    return Response.json({
      success: true,
      bid,
      emailSent: true,
      message: "Bid submitted successfully.",
    });
  } catch (error) {
    console.error("Bid submission error:", error);

    return Response.json(
      {
        error: "Unable to submit bid. Please try again.",
      },
      { status: 500 }
    );
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
