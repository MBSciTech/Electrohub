import React, { useState } from 'react';

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const faqData = {
    'Ordering': [
      {
        question: "How do I place an order?",
        answer: "Browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or sign in to complete your purchase."
      },
      {
        question: "Can I modify or cancel my order?",
        answer: "You can modify or cancel your order within 2 hours of placing it. Contact our customer service team for assistance."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay."
      }
    ],
    'Shipping': [
      {
        question: "How long does shipping take?",
        answer: "Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available for an additional fee."
      },
      {
        question: "Do you ship internationally?",
        answer: "Currently, we only ship within the United States. We're working on expanding our shipping options."
      },
      {
        question: "How much does shipping cost?",
        answer: "Free shipping on orders over $50. Standard shipping is $5.99 for orders under $50."
      }
    ],
    'Returns': [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for most items. Products must be in original condition with all packaging."
      },
      {
        question: "How do I return an item?",
        answer: "Log into your account, go to your orders, and select the item you want to return. Print the return label and ship it back."
      },
      {
        question: "When will I receive my refund?",
        answer: "Refunds are processed within 5-7 business days after we receive your return."
      }
    ],
    'Technical Support': [
      {
        question: "How do I set up my new device?",
        answer: "Each product comes with detailed setup instructions. You can also find video tutorials on our YouTube channel."
      },
      {
        question: "What if my product doesn't work?",
        answer: "Contact our technical support team. Most issues can be resolved remotely, or we'll help you with warranty claims."
      },
      {
        question: "Do you offer installation services?",
        answer: "Yes, we offer professional installation services for complex electronics. Contact us for pricing and availability."
      }
    ]
  };

  const allFaqs = Object.values(faqData).flat();
  
  const filteredFaqs = activeCategory === 'all' 
    ? allFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : faqData[activeCategory]?.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-dark mb-3">
              <i className="bi bi-question-circle-fill text-warning me-3"></i>
              Help Center
            </h1>
            <p className="lead text-muted">
              Find answers to common questions and get the support you need
            </p>
          </div>

          {/* Search Bar */}
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto">
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-warning border-0">
                  <i className="bi bi-search text-white"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-0 shadow-sm"
                  placeholder="Search for help..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="d-flex flex-wrap justify-content-center gap-2">
                <button
                  className={`btn ${activeCategory === 'all' ? 'btn-warning' : 'btn-outline-warning'}`}
                  onClick={() => setActiveCategory('all')}
                >
                  All Topics
                </button>
                {Object.keys(faqData).map(category => (
                  <button
                    key={category}
                    className={`btn ${activeCategory === category ? 'btn-warning' : 'btn-outline-warning'}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="row g-3">
                <div className="col-md-3">
                  <div className="card border-0 shadow-sm h-100 text-center">
                    <div className="card-body p-4">
                      <i className="bi bi-telephone-fill text-warning fs-1 mb-3"></i>
                      <h5 className="fw-bold">Call Us</h5>
                      <p className="text-muted small">Speak with our support team</p>
                      <a href="tel:+15551234567" className="btn btn-outline-warning btn-sm">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card border-0 shadow-sm h-100 text-center">
                    <div className="card-body p-4">
                      <i className="bi bi-envelope-fill text-warning fs-1 mb-3"></i>
                      <h5 className="fw-bold">Email Support</h5>
                      <p className="text-muted small">Get help via email</p>
                      <a href="mailto:support@electrohub.com" className="btn btn-outline-warning btn-sm">
                        support@electrohub.com
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card border-0 shadow-sm h-100 text-center">
                    <div className="card-body p-4">
                      <i className="bi bi-chat-dots-fill text-warning fs-1 mb-3"></i>
                      <h5 className="fw-bold">Live Chat</h5>
                      <p className="text-muted small">Chat with us online</p>
                      <button className="btn btn-outline-warning btn-sm">
                        Start Chat
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card border-0 shadow-sm h-100 text-center">
                    <div className="card-body p-4">
                      <i className="bi bi-youtube text-warning fs-1 mb-3"></i>
                      <h5 className="fw-bold">Video Guides</h5>
                      <p className="text-muted small">Watch tutorials</p>
                      <a href="#" className="btn btn-outline-warning btn-sm">
                        Watch Videos
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="row">
            <div className="col-12">
              <h3 className="fw-bold mb-4">
                {activeCategory === 'all' ? 'Frequently Asked Questions' : `${activeCategory} FAQ`}
              </h3>
              
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-search text-muted fs-1 mb-3"></i>
                  <h5 className="text-muted">No results found</h5>
                  <p className="text-muted">Try adjusting your search terms or browse all categories</p>
                </div>
              ) : (
                <div className="accordion" id="faqAccordion">
                  {filteredFaqs.map((faq, index) => (
                    <div className="accordion-item border-0 shadow-sm mb-3" key={index}>
                      <h2 className="accordion-header" id={`heading${index}`}>
                        <button
                          className="accordion-button collapsed bg-white text-dark fw-bold"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index}`}
                          aria-expanded="false"
                          aria-controls={`collapse${index}`}
                        >
                          {faq.question}
                        </button>
                      </h2>
                      <div
                        id={`collapse${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading${index}`}
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="accordion-body text-muted">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Still Need Help */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="card border-0 bg-light">
                <div className="card-body text-center p-5">
                  <h4 className="fw-bold mb-3">Still Need Help?</h4>
                  <p className="text-muted mb-4">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <div className="d-flex justify-content-center gap-3">
                    <a href="/contact" className="btn btn-warning btn-lg">
                      <i className="bi bi-envelope me-2"></i>
                      Contact Us
                    </a>
                    <a href="tel:+15551234567" className="btn btn-outline-warning btn-lg">
                      <i className="bi bi-telephone me-2"></i>
                      Call Now
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

export default HelpCenter; 