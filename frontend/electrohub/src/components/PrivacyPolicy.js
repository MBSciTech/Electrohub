import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-dark mb-3">
              <i className="bi bi-shield-lock text-warning me-3"></i>
              Privacy Policy
            </h1>
            <p className="lead text-muted">
              Last updated: January 2024
            </p>
          </div>

          {/* Content */}
          <div className="card border-0 shadow-sm">
            <div className="card-body p-5">
              <div className="mb-5">
                <h3 className="fw-bold mb-3">1. Information We Collect</h3>
                <p className="text-muted mb-3">
                  We collect information you provide directly to us, such as when you create an account, 
                  make a purchase, or contact our customer service team.
                </p>
                <h5 className="fw-bold mb-2">Personal Information:</h5>
                <ul className="text-muted">
                  <li>Name and contact information</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information</li>
                  <li>Account credentials</li>
                  <li>Communication preferences</li>
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">2. How We Use Your Information</h3>
                <p className="text-muted mb-3">
                  We use the information we collect to provide, maintain, and improve our services.
                </p>
                <ul className="text-muted">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your account and orders</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Prevent fraud and ensure security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">3. Information Sharing</h3>
                <p className="text-muted mb-3">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  except in the following circumstances:
                </p>
                <ul className="text-muted">
                  <li>With your explicit consent</li>
                  <li>To service providers who assist in our operations</li>
                  <li>To comply with legal requirements</li>
                  <li>To protect our rights and safety</li>
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">4. Data Security</h3>
                <p className="text-muted mb-3">
                  We implement appropriate security measures to protect your personal information:
                </p>
                <ul className="text-muted">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure servers and databases</li>
                  <li>Regular security audits</li>
                  <li>Access controls and authentication</li>
                  <li>Employee training on data protection</li>
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">5. Cookies and Tracking</h3>
                <p className="text-muted mb-3">
                  We use cookies and similar technologies to enhance your browsing experience:
                </p>
                <ul className="text-muted">
                  <li>Essential cookies for website functionality</li>
                  <li>Analytics cookies to understand usage patterns</li>
                  <li>Marketing cookies for personalized content</li>
                  <li>You can control cookie settings in your browser</li>
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">6. Your Rights</h3>
                <p className="text-muted mb-3">
                  You have the right to:
                </p>
                <ul className="text-muted">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Port your data to another service</li>
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">7. Children's Privacy</h3>
                <p className="text-muted">
                  Our services are not intended for children under 13. We do not knowingly collect 
                  personal information from children under 13. If you believe we have collected 
                  information from a child under 13, please contact us immediately.
                </p>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">8. Changes to This Policy</h3>
                <p className="text-muted">
                  We may update this privacy policy from time to time. We will notify you of any 
                  material changes by posting the new policy on our website and updating the 
                  "Last updated" date.
                </p>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">9. Contact Us</h3>
                <p className="text-muted">
                  If you have any questions about this privacy policy or our data practices, 
                  please contact us:
                </p>
                <ul className="text-muted">
                  <li>Email: privacy@electrohub.com</li>
                  <li>Phone: +1 (555) 123-4567</li>
                  <li>Address: 123 Tech Street, Digital City, DC 12345</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 