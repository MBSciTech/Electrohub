import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setNewsletterStatus('Thank you for subscribing!');
      setEmail('');
      setTimeout(() => setNewsletterStatus(''), 3000);
    }
  };

  return (
    <footer className="bg-dark text-light py-5 mt-5 border-top shadow-sm w-100">
      <div className="container-fluid px-5">
        <div className="row g-4">
          {/* Brand & About Section */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-uppercase mb-3">
              <i className="bi bi-lightning-charge-fill text-warning me-2"></i>
              ElectroHub
            </h5>
            <p className="small text-muted mb-3">
              Your premier destination for cutting-edge electronics, expert tutorials, 
              and innovative tech solutions. We bring the future of technology to your doorstep.
            </p>
            <div className="d-flex gap-2">
              <a href="#" className="text-light fs-5" title="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-light fs-5" title="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-light fs-5" title="Twitter">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-light fs-5" title="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="#" className="text-light fs-5" title="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-uppercase mb-3 fw-bold">Shop</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-decoration-none text-light small">
                  <i className="bi bi-house-door me-1"></i>Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/shop" className="text-decoration-none text-light small">
                  <i className="bi bi-grid me-1"></i>All Products
                </a>
              </li>
              <li className="mb-2">
                <a href="/about" className="text-decoration-none text-light small">
                  <i className="bi bi-info-circle me-1"></i>About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="text-decoration-none text-light small">
                  <i className="bi bi-envelope me-1"></i>Contact
                </a>
              </li>
              <li className="mb-2">
                <a href="/staff" className="text-decoration-none text-light small">
                  <i className="bi bi-person-badge me-1"></i>Staff Panel
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-uppercase mb-3 fw-bold">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/help" className="text-decoration-none text-light small">
                  <i className="bi bi-question-circle me-1"></i>Help Center
                </a>
              </li>
              <li className="mb-2">
                <a href="/shipping" className="text-decoration-none text-light small">
                  <i className="bi bi-truck me-1"></i>Shipping Info
                </a>
              </li>
              <li className="mb-2">
                <a href="/returns" className="text-decoration-none text-light small">
                  <i className="bi bi-arrow-return-left me-1"></i>Returns
                </a>
              </li>
              <li className="mb-2">
                <a href="/warranty" className="text-decoration-none text-light small">
                  <i className="bi bi-shield-check me-1"></i>Warranty
                </a>
              </li>
              <li className="mb-2">
                <a href="/faq" className="text-decoration-none text-light small">
                  <i className="bi bi-chat-quote me-1"></i>FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-uppercase mb-3 fw-bold">Stay Connected</h6>
            <div className="mb-3">
              <p className="small text-muted mb-2">
                <i className="bi bi-geo-alt me-2"></i>
                123 Tech Street, Digital City, DC 12345
              </p>
              <p className="small text-muted mb-2">
                <i className="bi bi-telephone me-2"></i>
                +1 (555) 123-4567
              </p>
              <p className="small text-muted mb-3">
                <i className="bi bi-envelope me-2"></i>
                support@electrohub.com
              </p>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mb-3">
              <h6 className="small fw-bold mb-2">Newsletter</h6>
              <form onSubmit={handleNewsletterSubmit} className="d-flex gap-2">
                <input
                  type="email"
                  className="form-control form-control-sm"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-warning btn-sm">
                  <i className="bi bi-send"></i>
                </button>
              </form>
              {newsletterStatus && (
                <small className="text-success">{newsletterStatus}</small>
              )}
            </div>
          </div>

          {/* Payment & Security */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-uppercase mb-3 fw-bold">Payment</h6>
            <div className="mb-3">
              <p className="small text-muted mb-2">We Accept:</p>
              <div className="d-flex flex-wrap gap-1 mb-2">
                <i className="bi bi-credit-card text-light fs-5" title="Visa"></i>
                <i className="bi bi-credit-card text-light fs-5" title="Mastercard"></i>
                <i className="bi bi-credit-card text-light fs-5" title="American Express"></i>
                <i className="bi bi-paypal text-light fs-5" title="PayPal"></i>
              </div>
            </div>
            
            <div className="mb-3">
              <h6 className="small fw-bold mb-2">Security</h6>
              <div className="d-flex align-items-center gap-2 mb-2">
                <i className="bi bi-shield-check text-success"></i>
                <small className="text-muted">SSL Secured</small>
              </div>
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-lock text-success"></i>
                <small className="text-muted">256-bit Encryption</small>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="row mt-4 pt-4 border-top border-secondary">
          <div className="col-md-6">
            <div className="d-flex flex-wrap gap-3 small text-muted">
              <a href="/privacy" className="text-decoration-none text-light">Privacy Policy</a>
              <a href="/terms" className="text-decoration-none text-light">Terms of Service</a>
              <a href="/cookies" className="text-decoration-none text-light">Cookie Policy</a>
              <a href="/sitemap" className="text-decoration-none text-light">Sitemap</a>
            </div>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="small text-muted">
              © {new Date().getFullYear()} ElectroHub. All rights reserved.
              <br />
              <small>Made with <i className="bi bi-heart-fill text-danger"></i> for tech enthusiasts</small>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
