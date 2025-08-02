import React from 'react';

const Sitemap = () => {
  const sitemapData = {
    'Main Pages': [
      { name: 'Home', url: '/', description: 'Landing page with featured products and promotions' },
      { name: 'Shop', url: '/shop', description: 'Browse all our electronic products and accessories' },
      { name: 'About Us', url: '/about', description: 'Learn more about ElectroHub and our mission' },
      { name: 'Contact Us', url: '/contact', description: 'Get in touch with our customer service team' }
    ],
    'User Account': [
      { name: 'Login', url: '/login', description: 'Sign in to your account' },
      { name: 'Sign Up', url: '/signup', description: 'Create a new account' },
      { name: 'Profile', url: '/profile', description: 'Manage your account settings and preferences' },
      { name: 'Orders', url: '/orders', description: 'View your order history and track shipments' }
    ],
    'Shopping': [
      { name: 'Cart', url: '/cart', description: 'View and manage your shopping cart' },
      { name: 'Checkout', url: '/checkout', description: 'Complete your purchase securely' },
      { name: 'Product Pages', url: '/product/:id', description: 'Detailed product information and reviews' }
    ],
    'Support & Help': [
      { name: 'Help Center', url: '/help', description: 'Find answers to common questions and get support' },
      { name: 'FAQ', url: '/faq', description: 'Frequently asked questions and quick answers' },
      { name: 'Shipping Info', url: '/shipping', description: 'Shipping options, rates, and delivery information' },
      { name: 'Returns', url: '/returns', description: 'Return policy and process for refunds' },
      { name: 'Warranty', url: '/warranty', description: 'Warranty information and claim process' }
    ],
    'Legal': [
      { name: 'Privacy Policy', url: '/privacy', description: 'How we collect, use, and protect your information' },
      { name: 'Terms of Service', url: '/terms', description: 'Terms and conditions for using our website' },
      { name: 'Cookie Policy', url: '/cookies', description: 'Information about our use of cookies' }
    ],
    'Staff': [
      { name: 'Staff Panel', url: '/staff', description: 'Administrative panel for staff members' }
    ]
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-dark mb-3">
              <i className="bi bi-diagram-3 text-warning me-3"></i>
              Site Map
            </h1>
            <p className="lead text-muted">
              Navigate through all pages and sections of ElectroHub
            </p>
          </div>

          {/* Sitemap Content */}
          <div className="row g-4">
            {Object.entries(sitemapData).map(([category, pages]) => (
              <div key={category} className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h4 className="fw-bold mb-3 text-warning">
                      <i className="bi bi-folder me-2"></i>
                      {category}
                    </h4>
                    <div className="list-group list-group-flush">
                      {pages.map((page, index) => (
                        <div key={index} className="list-group-item border-0 px-0">
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="flex-grow-1">
                              <h6 className="fw-bold mb-1">
                                <a href={page.url} className="text-decoration-none text-dark">
                                  {page.name}
                                </a>
                              </h6>
                              <p className="text-muted small mb-0">{page.description}</p>
                            </div>
                            <a href={page.url} className="btn btn-outline-warning btn-sm">
                              <i className="bi bi-arrow-right"></i>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Navigation */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="card border-0 bg-light">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-3">
                    <i className="bi bi-lightning text-warning me-2"></i>
                    Quick Navigation
                  </h4>
                  <div className="row g-3">
                    <div className="col-md-3">
                      <h6 className="fw-bold mb-2">Shop</h6>
                      <ul className="list-unstyled small">
                        <li><a href="/shop" className="text-decoration-none text-muted">All Products</a></li>
                        <li><a href="/cart" className="text-decoration-none text-muted">Shopping Cart</a></li>
                        <li><a href="/checkout" className="text-decoration-none text-muted">Checkout</a></li>
                      </ul>
                    </div>
                    <div className="col-md-3">
                      <h6 className="fw-bold mb-2">Account</h6>
                      <ul className="list-unstyled small">
                        <li><a href="/login" className="text-decoration-none text-muted">Sign In</a></li>
                        <li><a href="/signup" className="text-decoration-none text-muted">Create Account</a></li>
                        <li><a href="/profile" className="text-decoration-none text-muted">My Profile</a></li>
                      </ul>
                    </div>
                    <div className="col-md-3">
                      <h6 className="fw-bold mb-2">Support</h6>
                      <ul className="list-unstyled small">
                        <li><a href="/help" className="text-decoration-none text-muted">Help Center</a></li>
                        <li><a href="/contact" className="text-decoration-none text-muted">Contact Us</a></li>
                        <li><a href="/faq" className="text-decoration-none text-muted">FAQ</a></li>
                      </ul>
                    </div>
                    <div className="col-md-3">
                      <h6 className="fw-bold mb-2">Legal</h6>
                      <ul className="list-unstyled small">
                        <li><a href="/privacy" className="text-decoration-none text-muted">Privacy Policy</a></li>
                        <li><a href="/terms" className="text-decoration-none text-muted">Terms of Service</a></li>
                        <li><a href="/cookies" className="text-decoration-none text-muted">Cookie Policy</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Functionality */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center p-5">
                  <h4 className="fw-bold mb-3">Can't Find What You're Looking For?</h4>
                  <p className="text-muted mb-4">
                    Use our search functionality to quickly find products, pages, or information.
                  </p>
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search ElectroHub..."
                        />
                        <button className="btn btn-warning" type="button">
                          <i className="bi bi-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="card border-0 bg-light">
                <div className="card-body text-center p-4">
                  <h5 className="fw-bold mb-3">Need Help Navigating?</h5>
                  <p className="text-muted mb-3">
                    Our customer service team is here to help you find what you're looking for.
                  </p>
                  <div className="d-flex justify-content-center gap-3">
                    <a href="/contact" className="btn btn-warning">
                      <i className="bi bi-envelope me-2"></i>
                      Contact Support
                    </a>
                    <a href="tel:+15551234567" className="btn btn-outline-warning">
                      <i className="bi bi-telephone me-2"></i>
                      Call Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap; 