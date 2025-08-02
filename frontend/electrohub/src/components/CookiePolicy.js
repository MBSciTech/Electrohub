import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-dark mb-3">
              <i className="bi bi-cookie text-warning me-3"></i>
              Cookie Policy
            </h1>
            <p className="lead text-muted">
              Last updated: January 2024
            </p>
          </div>

          {/* Content */}
          <div className="card border-0 shadow-sm">
            <div className="card-body p-5">
              <div className="mb-5">
                <h3 className="fw-bold mb-3">What Are Cookies?</h3>
                <p className="text-muted">
                  Cookies are small text files that are placed on your device when you visit our website. 
                  They help us provide you with a better experience by remembering your preferences and 
                  analyzing how you use our site.
                </p>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">How We Use Cookies</h3>
                <p className="text-muted mb-3">
                  We use cookies for several purposes:
                </p>
                <ul className="text-muted">
                  <li>To provide essential website functionality</li>
                  <li>To remember your preferences and settings</li>
                  <li>To analyze how our website is used</li>
                  <li>To provide personalized content and advertisements</li>
                  <li>To improve our website and services</li>
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">Types of Cookies We Use</h3>
                
                <div className="mb-4">
                  <h5 className="fw-bold text-success mb-2">Essential Cookies</h5>
                  <p className="text-muted mb-2">
                    These cookies are necessary for the website to function properly. They enable basic 
                    functions like page navigation, access to secure areas, and shopping cart functionality.
                  </p>
                  <ul className="text-muted">
                    <li>Session management</li>
                    <li>Shopping cart functionality</li>
                    <li>Security features</li>
                    <li>User authentication</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="fw-bold text-info mb-2">Analytics Cookies</h5>
                  <p className="text-muted mb-2">
                    These cookies help us understand how visitors interact with our website by collecting 
                    and reporting information anonymously.
                  </p>
                  <ul className="text-muted">
                    <li>Page views and navigation patterns</li>
                    <li>Time spent on pages</li>
                    <li>Error tracking</li>
                    <li>Performance monitoring</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="fw-bold text-warning mb-2">Functional Cookies</h5>
                  <p className="text-muted mb-2">
                    These cookies enable enhanced functionality and personalization, such as remembering 
                    your preferences and settings.
                  </p>
                  <ul className="text-muted">
                    <li>Language preferences</li>
                    <li>Currency settings</li>
                    <li>User preferences</li>
                    <li>Form data retention</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="fw-bold text-primary mb-2">Marketing Cookies</h5>
                  <p className="text-muted mb-2">
                    These cookies are used to track visitors across websites to display relevant and 
                    engaging advertisements.
                  </p>
                  <ul className="text-muted">
                    <li>Ad targeting and personalization</li>
                    <li>Social media integration</li>
                    <li>Retargeting campaigns</li>
                    <li>Conversion tracking</li>
                  </ul>
                </div>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">Third-Party Cookies</h3>
                <p className="text-muted mb-3">
                  We may use third-party services that place cookies on your device:
                </p>
                <ul className="text-muted">
                  <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong>Google Ads:</strong> For advertising and conversion tracking</li>
                  <li><strong>Facebook Pixel:</strong> For social media advertising</li>
                  <li><strong>Payment Processors:</strong> For secure payment processing</li>
                  <li><strong>Social Media:</strong> For social sharing and integration</li>
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">Cookie Duration</h3>
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="fw-bold mb-2">Session Cookies</h6>
                    <p className="text-muted small">
                      These cookies are temporary and are deleted when you close your browser. 
                      They are used for essential website functionality.
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold mb-2">Persistent Cookies</h6>
                    <p className="text-muted small">
                      These cookies remain on your device for a set period or until you delete them. 
                      They remember your preferences and settings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">Managing Your Cookie Preferences</h3>
                <p className="text-muted mb-3">
                  You have several options for managing cookies:
                </p>
                
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="card border-0 bg-light h-100">
                      <div className="card-body p-3">
                        <h6 className="fw-bold mb-2">Browser Settings</h6>
                        <p className="text-muted small mb-2">
                          You can control cookies through your browser settings:
                        </p>
                        <ul className="text-muted small">
                          <li>Chrome: Settings → Privacy and Security → Cookies</li>
                          <li>Firefox: Options → Privacy & Security → Cookies</li>
                          <li>Safari: Preferences → Privacy → Cookies</li>
                          <li>Edge: Settings → Cookies and site permissions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card border-0 bg-light h-100">
                      <div className="card-body p-3">
                        <h6 className="fw-bold mb-2">Cookie Consent</h6>
                        <p className="text-muted small mb-2">
                          When you first visit our website, you'll see a cookie consent banner 
                          where you can choose which types of cookies to accept.
                        </p>
                        <p className="text-muted small">
                          You can change your preferences at any time through our cookie settings.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">Impact of Disabling Cookies</h3>
                <p className="text-muted mb-3">
                  If you choose to disable cookies, some features of our website may not function properly:
                </p>
                <ul className="text-muted">
                  <li>Shopping cart may not work correctly</li>
                  <li>You may need to re-enter information repeatedly</li>
                  <li>Personalized content may not be available</li>
                  <li>Some website features may be limited</li>
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">Updates to This Policy</h3>
                <p className="text-muted">
                  We may update this Cookie Policy from time to time to reflect changes in our practices 
                  or for other operational, legal, or regulatory reasons. We will notify you of any 
                  material changes by posting the new policy on our website.
                </p>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">Contact Us</h3>
                <p className="text-muted">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
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

export default CookiePolicy; 