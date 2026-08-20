export default function Home() {
  return (
    <main>
      {/* NAVIGATION */}
      <header className="navbar">
        <div className="nav-container">
          <div className="logo">
            <div className="logo-mark">C</div>
            <div>
              <div className="logo-name">CCFI</div>
              <div className="logo-subtitle">BIDDING PORTAL</div>
            </div>
          </div>

          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#units">Available Units</a>
            <a href="#how-it-works">How It Works</a>
          </nav>

          <a href="#units" className="nav-button">
            View Units
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-badge">
            ONLINE MOTORCYCLE BIDDING
          </div>

          <h1>
            Find Your Next
            <span> Motorcycle.</span>
          </h1>

          <p>
            Browse our available motorcycle units and submit
            your best offer through the CCFI Online Bidding Portal.
          </p>

          <div className="hero-actions">
            <a href="#units" className="primary-button">
              Browse Available Units
            </a>

            <a href="#how-it-works" className="secondary-button">
              How It Works
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <strong>100%</strong>
              <span>Online Bidding</span>
            </div>

            <div>
              <strong>Secure</strong>
              <span>Bid Submission</span>
            </div>

            <div>
              <strong>Fast</strong>
              <span>Processing</span>
            </div>
          </div>
        </div>
      </section>

      {/* AVAILABLE UNITS */}
      <section className="units-section" id="units">
        <div className="section-heading">
          <div>
            <span className="section-label">AVAILABLE NOW</span>

            <h2>Available Motorcycle Units</h2>

            <p>
              Explore the units currently available for bidding.
              Select a unit to view its details and submit your offer.
            </p>
          </div>

          <div className="unit-count">
            <strong>0</strong>
            <span>Units Available</span>
          </div>
        </div>

        {/* EMPTY STATE */}
        <div className="empty-state">
          <div className="empty-icon">🏍️</div>

          <h3>No Units Available Yet</h3>

          <p>
            Available motorcycle units will appear here once they
            are published by the administrator.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how-it-works">
        <div className="section-heading centered">
          <span className="section-label">SIMPLE PROCESS</span>

          <h2>How Bidding Works</h2>

          <p>
            Submit your offer in just a few simple steps.
          </p>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">01</div>

            <div className="step-icon">🏍️</div>

            <h3>Choose a Unit</h3>

            <p>
              Browse the available motorcycle units and select
              the one you are interested in.
            </p>
          </div>

          <div className="step">
            <div className="step-number">02</div>

            <div className="step-icon">💰</div>

            <h3>Place Your Bid</h3>

            <p>
              Enter your contact information and submit your
              best offer for the selected unit.
            </p>
          </div>

          <div className="step">
            <div className="step-number">03</div>

            <div className="step-icon">📋</div>

            <h3>Bid Review</h3>

            <p>
              Our team reviews submitted bids and evaluates
              the available offers.
            </p>
          </div>

          <div className="step">
            <div className="step-number">04</div>

            <div className="step-icon">✓</div>

            <h3>Get Notified</h3>

            <p>
              If your bid is selected, our team will contact
              you regarding the next steps.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <span className="section-label">READY TO BID?</span>

          <h2>
            Find a motorcycle
            <br />
            and make your offer.
          </h2>

          <p>
            Check our available units and submit your bid online.
          </p>

          <a href="#units" className="primary-button">
            View Available Units
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="logo">
            <div className="logo-mark">C</div>

            <div>
              <div className="logo-name">CCFI</div>
              <div className="logo-subtitle">BIDDING PORTAL</div>
            </div>
          </div>

          <p>
            © {new Date().getFullYear()} CCFI. All rights reserved.
          </p>

          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#units">Available Units</a>
            <a href="#how-it-works">How It Works</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
