import React from 'react';

const TermsOfService = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-dark mb-3">
              <i className="bi bi-file-text text-warning me-3"></i>
              Terms of Service
            </h1>
            <p className="lead text-muted">
              Last updated: January 2024
            </p>
          </div>

          {/* Content */}
          <div className="card border-0 shadow-sm">
            <div className="card-body p-5">
              <div className="mb-5">
                <h3 className="fw-bold mb-3">1. Acceptance of Terms</h3>
                <p className="text-muted">
                  By accessing and using ElectroHub's website and services, you accept and agree to be bound 
                  by the terms and provision of this agreement. If you do not agree to abide by the above, 
                  please do not use this service.
                </p>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">2. Use License</h3>
                <p className="text-muted mb-3">
                  Permission is granted to temporarily download one copy of the materials (information or software) 
                  on ElectroHub's website for personal, non-commercial transitory viewing only.
                </p>
                <p className="text-muted mb-3">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                <ul className="text-muted">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">3. User Account</h3>
                <p className="text-muted mb-3">
                  When you create an account with us, you must provide information that is accurate, complete, 
                  and current at all times. You are responsible for safeguarding the password and for all activities 
                  that occur under your account.
                </p>
                <ul className="text-muted">
                  <li>You must be at least 18 years old to create an account</li>
                  <li>You are responsible for maintaining the confidentiality of your account</li>
                  <li>You agree to accept responsibility for all activities under your account</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">4. Product Information</h3>
                <p className="text-muted mb-3">
                  We strive to provide accurate product information, but we do not warrant that product descriptions 
                  or other content is accurate, complete, reliable, current, or error-free.
                </p>
                <ul className="text-muted">
                  <li>Product images are for illustrative purposes only</li>
                  <li>Actual product may vary from images shown</li>
                  <li>Prices are subject to change without notice</li>
                  <li>Product availability is not guaranteed</li>
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">5. Payment Terms</h3>
                <p className="text-muted mb-3">
                  All purchases are subject to our payment terms and conditions.
                </p>
                <ul className="text-muted">
                  <li>Payment is due at the time of order placement</li>
                  <li>We accept major credit cards and PayPal</li>
                  <li>All prices are in US dollars unless otherwise stated</li>
                  <li>Sales tax will be added where applicable</li>
                  <li>We reserve the right to refuse any order</li>
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">6. Shipping and Delivery</h3>
                <p className="text-muted mb-3">
                  We will make every effort to ship your order promptly, but we do not guarantee delivery dates.
                </p>
                <ul className="text-muted">
                  <li>Shipping times are estimates only</li>
                  <li>Risk of loss passes to you upon delivery</li>
                  <li>We are not responsible for delays beyond our control</li>
                  <li>International shipping may be subject to customs duties</li>
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">7. Returns and Refunds</h3>
                <p className="text-muted mb-3">
                  Our return policy is designed to ensure your satisfaction with your purchase.
                </p>
                <ul className="text-muted">
                  <li>30-day return policy for most items</li>
                  <li>Items must be in original condition</li>
                  <li>Some items are non-returnable</li>
                  <li>Return shipping is free for eligible items</li>
                  <li>Refunds are processed within 5-7 business days</li>
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">8. Intellectual Property</h3>
                <p className="text-muted mb-3">
                  The content on this website, including text, graphics, logos, images, and software, 
                  is the property of ElectroHub and is protected by copyright laws.
                </p>
                <ul className="text-muted">
                  <li>You may not reproduce, distribute, or create derivative works</li>
                  <li>All trademarks and trade names are our property</li>
                  <li>Unauthorized use may result in legal action</li>
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">9. Limitation of Liability</h3>
                <p className="text-muted mb-3">
                  In no event shall ElectroHub be liable for any damages arising out of the use or inability 
                  to use the materials on our website.
                </p>
                <ul className="text-muted">
                  <li>We are not liable for indirect, incidental, or consequential damages</li>
                  <li>Our total liability shall not exceed the amount paid for the product</li>
                  <li>Some jurisdictions do not allow limitations on liability</li>
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">10. Privacy Policy</h3>
                <p className="text-muted">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs 
                  your use of the website, to understand our practices.
                </p>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">11. Governing Law</h3>
                <p className="text-muted">
                  These terms shall be governed by and construed in accordance with the laws of the United States, 
                  without regard to its conflict of law provisions.
                </p>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">12. Changes to Terms</h3>
                <p className="text-muted">
                  We reserve the right to modify these terms at any time. We will notify users of any material 
                  changes by posting the new terms on this page.
                </p>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3">13. Contact Information</h3>
                <p className="text-muted">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <ul className="text-muted">
                  <li>Email: legal@electrohub.com</li>
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

export default TermsOfService; 