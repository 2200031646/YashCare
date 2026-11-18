import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-6 hero-content">
              <span className="hero-label">
                COMMUNITY HEALTHCARE PLATFORM
              </span>

              <h1>
                Healthcare is a
                <span> Right, Not a Privilege.</span>
              </h1>

              <p>
                Together, we can make healthcare accessible to everyone.
                Discover medical camps, request healthcare assistance,
                and support people in need through meaningful contributions.
              </p>

              <div className="hero-buttons">
                <a href="#services" className="primary-btn">Explore Services</a>

                <a href="#about" className="secondary-btn">Learn More</a>
              </div>

              <div className="hero-note">
                <span>♥</span>
                Healthcare support begins with caring for each other.
              </div>
            </div>

            <div className="col-lg-6 hero-image">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900"
                alt="Healthcare professionals providing medical care"/>
              <div className="image-tag">
                <span>♥</span>
                Care for Every Community
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="intro-section" id="about">
        <div className="container">
          <div className="row align-items-center g-4">

            <div className="col-lg-6">
              <div className="about-content">

                <span className="section-label">
                  ABOUT YASHCARE
                </span>

                <h2>
                  Making Healthcare
                  <span> Accessible to All</span>
                </h2>

                <p>
                  YashCare is a community-focused healthcare platform
                  that brings patients, donors, and communities together.
                  Our goal is to make healthcare support more accessible
                  through medical camps, assistance requests, and
                  donation campaigns.
                </p>

                <p>
                  We believe that everyone deserves access to healthcare
                  and that small contributions can create a meaningful
                  difference in people's lives.
                </p>

                <Link to="/register" className="primary-btn">Join Our Community</Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-features">
                <div className="about-feature-card">
                  <div className="about-feature-icon">✚</div>
                  <div>
                    <h3>Community Care</h3>
                    <p>
                      Discover medical camps and healthcare
                      opportunities in your community.
                    </p>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon">♡</div>
                  <div>
                    <h3>Patient Support</h3>
                    <p>
                      Request healthcare assistance and track
                      your requests through the platform.
                    </p>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon">♥</div>
                  <div>
                    <h3>Donor Contributions</h3>
                    <p>
                      Support healthcare campaigns and help
                      people who need medical assistance.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="container">

          <div className="section-heading text-center" id="services">
            <span className="section-label">WHAT WE DO</span>
            <h2>Our Healthcare Services</h2>
            <p>
              Explore the different ways YashCare supports the community.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="service-card">

                <img
                  src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600"
                  alt="Medical checkup"
                  className="service-image"/>

                <h3>Medical Camps</h3>

                <p>
                  Discover upcoming medical camps and find healthcare
                  opportunities in your community.
                </p>

                <Link to="/camps" className="primary-btn">Explore Camps</Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="service-card">

                <img
                  src="https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=600"
                  alt="Healthcare medical supplies"
                  className="service-image"/>

                <h3>Healthcare Assistance</h3>

                <p>
                  Submit healthcare assistance requests and track
                  their progress through the platform.
                </p>

                <Link to="/assistance-request" className="primary-btn">Get Assistance</Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="service-card">

                <img
                  src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=600"
                  alt="Healthcare support"
                  className="service-image"/>

                <h3>Donation Campaigns</h3>

                <p>
                  Support healthcare campaigns through simulated
                  contributions and help those in need.
                </p>

                <Link to="/campaigns" className="primary-btn">View Campaigns</Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="contact-content">

                <span className="contact-label">
                  LET'S MAKE A DIFFERENCE
                </span>

                <h2>
                  Together, We Can
                  <span> Make Healthcare Better.</span>
                </h2>

                <p>
                  Every small action can make a big difference.
                  Whether you are looking for healthcare support
                  or want to help someone in need, YashCare brings
                  our community together.
                </p>

                <Link to="/register" className="contact-main-btn">
                  Join YashCare <span>→</span>
                </Link>

              </div>
            </div>

            <div className="col-lg-6">
              <div className="contact-card">

                <h3>How Can We Help You?</h3>

                <p className="contact-card-description">
                  Find the support or opportunity you are looking for.
                </p>

                <Link to="/camps" className="contact-option">
                  <div className="contact-option-icon">✚</div>
                  <div className="contact-option-text">
                    <h4>Explore Medical Camps</h4>
                    <p>Find healthcare camps in your community.</p>
                  </div>
                  <span className="contact-arrow">→</span>
                </Link>

                <Link to="/assistance-request" className="contact-option">
                  <div className="contact-option-icon">♡</div>
                  <div className="contact-option-text">
                    <h4>Healthcare Assistance</h4>
                    <p>Submit a request for healthcare support.</p>
                  </div>
                  <span className="contact-arrow">→</span>
                </Link>

                <Link to="/campaigns" className="contact-option">
                  <div className="contact-option-icon">♥</div>
                  <div className="contact-option-text">
                    <h4>Support a Campaign</h4>
                    <p>Explore campaigns and support the community.</p>
                  </div>
                  <span className="contact-arrow">→</span>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="yash-footer">
        <div className="container">
          <h3>Yash<span>Care</span></h3>

          <p>Healthcare for Everyone. Care for Every Community.</p>

          <div className="footer-divider"></div>

          <small>© 2026 YashCare. All rights reserved.</small>
        </div>
      </footer>

    </div>
  );
}

export default Home;