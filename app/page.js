"use client";

import { useState } from "react";

const units = [
  {
    id: 1,
    brand: "Honda",
    model: "Click 125i",
    year: "2024",
    color: "Matte Black",
    mileage: "8,245 km",
    startingBid: 55000,
    location: "Rizal",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    brand: "Yamaha",
    model: "NMAX 155",
    year: "2023",
    color: "Black",
    mileage: "12,410 km",
    startingBid: 68000,
    location: "Rizal",
    image:
      "https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    brand: "Honda",
    model: "ADV 160",
    year: "2024",
    color: "Red",
    mileage: "6,820 km",
    startingBid: 82000,
    location: "Bulacan",
    image:
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function Home() {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      <header className="navbar">
        <div className="logo">
          <div className="logo-mark">C</div>
          <div>
            <strong>CCFI</strong>
            <span>BIDDING PORTAL</span>
          </div>
        </div>

        <nav>
          <a href="#units">Available Units</a>
          <a href="#how">How It Works</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <div className="badge">MOTORCYCLE BIDDING PORTAL</div>

          <h1>
            Find Your Next
            <span> Motorcycle.</span>
          </h1>

          <p>
            Browse available motorcycle units and submit your bid online.
            Simple, transparent, and convenient.
          </p>

          <a href="#units" className="hero-button">
            VIEW AVAILABLE UNITS
          </a>
        </div>

        <div className="hero-card">
          <div className="hero-card-label">ONLINE BIDDING</div>
          <div className="hero-bike">🏍️</div>
          <h3>Available Units</h3>
          <p>Browse • Bid • Win</p>
        </div>
      </section>

      <section id="units" className="units-section">
        <div className="section-heading">
          <div>
            <span className="section-label">CURRENT INVENTORY</span>
            <h2>Available Units</h2>
          </div>

          <div className="unit-count">
            {units.length} UNITS AVAILABLE
          </div>
        </div>

        <div className="unit-grid">
          {units.map((unit) => (
            <article className="unit-card" key={unit.id}>
              <div className="unit-image">
                <img src={unit.image} alt={`${unit.brand} ${unit.model}`} />
                <div className="available-badge">AVAILABLE</div>
              </div>

              <div className="unit-details">
                <div className="unit-brand">{unit.brand}</div>

                <h3>{unit.model}</h3>

                <div className="specs">
                  <span>{unit.year}</span>
                  <span>{unit.color}</span>
                  <span>{unit.mileage}</span>
                </div>

                <div className="unit-location">
                  📍 {unit.location}
                </div>

                <div className="bid-row">
                  <div>
                    <small>STARTING BID</small>
                    <strong>
                      ₱{unit.startingBid.toLocaleString()}
                    </strong>
                  </div>

                  <button onClick={() => setSelectedUnit(unit)}>
                    BID NOW
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="how" className="how-section">
        <div className="section-heading centered">
          <span className="section-label">SIMPLE PROCESS</span>
          <h2>How Bidding Works</h2>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">01</div>
            <h3>Choose a Unit</h3>
            <p>Browse the available motorcycle units.</p>
          </div>

          <div className="step">
            <div className="step-number">02</div>
            <h3>Submit Your Bid</h3>
            <p>Enter your information and preferred bid amount.</p>
          </div>

          <div className="step">
            <div className="step-number">03</div>
            <h3>We'll Review</h3>
            <p>Our team will review your submitted bid.</p>
          </div>

          <div className="step">
            <div className="step-number">04</div>
            <h3>Get Notified</h3>
            <p>We'll contact you regarding your bid.</p>
          </div>
        </div>
      </section>

      <footer id="contact">
        <div>
          <strong>CCFI BIDDING PORTAL</strong>
          <p>Motorcycle units available for bidding.</p>
        </div>

        <div>
          <p>© 2026 CCFI. All rights reserved.</p>
        </div>
      </footer>

      {selectedUnit && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedUnit(null)}
        >
          <div
            className="bid-modal"
            onClick={(event) => event.stopPropagation()}
          >
            {!submitted ? (
              <>
                <button
                  className="close-button"
                  onClick={() => setSelectedUnit(null)}
                >
                  ×
                </button>

                <span className="section-label">SUBMIT YOUR BID</span>

                <h2>
                  {selectedUnit.brand} {selectedUnit.model}
                </h2>

                <p className="modal-description">
                  Starting bid:{" "}
                  <strong>
                    ₱{selectedUnit.startingBid.toLocaleString()}
                  </strong>
                </p>

                <form onSubmit={handleSubmit}>
                  <label>
                    Full Name
                    <input required type="text" placeholder="Juan Dela Cruz" />
                  </label>

                  <label>
                    Mobile Number
                    <input required type="tel" placeholder="09XXXXXXXXX" />
                  </label>

                  <label>
                    Email Address
                    <input required type="email" placeholder="you@email.com" />
                  </label>

                  <label>
                    Your Bid Amount
                    <input
                      required
                      type="number"
                      min={selectedUnit.startingBid}
                      placeholder={selectedUnit.startingBid}
                    />
                  </label>

                  <label>
                    Message
                    <textarea
                      rows="3"
                      placeholder="Additional message (optional)"
                    />
                  </label>

                  <button className="submit-bid" type="submit">
                    SUBMIT BID
                  </button>
                </form>
              </>
            ) : (
              <div className="success-message">
                <div className="success-icon">✓</div>

                <h2>Bid Submitted!</h2>

                <p>
                  Thank you for your interest in the{" "}
                  <strong>
                    {selectedUnit.brand} {selectedUnit.model}
                  </strong>
                  .
                </p>

                <p>
                  Our team will review your bid and contact you.
                </p>

                <button
                  className="submit-bid"
                  onClick={() => {
                    setSubmitted(false);
                    setSelectedUnit(null);
                  }}
                >
                  CLOSE
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
