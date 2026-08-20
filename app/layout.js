import "./globals.css";

export const metadata = {
  title: "CCFI Bidding Portal",
  description: "Online bidding portal for available motorcycle units.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
