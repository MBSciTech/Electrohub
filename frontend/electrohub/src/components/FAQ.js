import React, { useState } from 'react';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const faqData = {
    'General': [
      {
        question: "What is ElectroHub?",
        answer: "ElectroHub is your premier destination for cutting-edge electronics, expert tutorials, and innovative tech solutions. We bring the future of technology to your doorstep with a curated selection of high-quality electronic products."
      },
      {
        question: "How do I create an account?",
        answer: "You can create an account by clicking the 'Sign Up' button in the top navigation. Simply provide your email address, create a password, and fill in your basic information to get started."
      },
      {
        question: "Is my personal information secure?",
        answer: "Yes, we take your privacy and security seriously. All personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent."
      }
    ],
    'Orders': [
      {
        question: "How do I place an order?",
        answer: "Browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or sign in to complete your purchase. We accept all major credit cards and PayPal."
      },
      {
        question: "Can I modify or cancel my order?",
        answer: "You can modify or cancel your order within 2 hours of placing it. Contact our customer service team for assistance with any changes to your order."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay for secure and convenient payments."
      }
    ],
    'Shipping': [
      {
        question: "How long does shipping take?",
        answer: "Standard shipping takes 3-5 business days. Express shipping (1-2 days) and overnight shipping are available for an additional fee. Free shipping on orders over $50."
      },
      {
        question: "Do you ship internationally?",
        answer: "Currently, we only ship within the United States and its territories. We're working on expanding our international shipping options."
      },
      {
        question: "How much does shipping cost?",
        answer: "Free shipping on orders over $50. Standard shipping is $5.99 for orders under $50. Express shipping is $12.99 and overnight is $24.99."
      }
    ],
    'Returns': [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for most items. Products must be in original condition with all packaging. Some items may be marked as non-returnable."
      },
      {
        question: "How do I return an item?",
        answer: "Log into your account, go to your orders, and select the item you want to return. Print the return label and ship it back. We'll process your refund within 5-7 business days."
      },
      {
        question: "When will I receive my refund?",
        answer: "Refunds are processed within 5-7 business days after we receive your return. The refund will be issued to your original payment method."
      }
    ],
    'Technical Support': [
      {
        question: "How do I set up my new device?",
        answer: "Each product comes with detailed setup instructions. You can also find video tutorials on our YouTube channel and detailed guides in our help center."
      },
      {
        question: "What if my product doesn't work?",
        answer: "Contact our technical support team. Most issues can be resolved remotely, or we'll help you with warranty claims and repairs."
      },
      {
        question: "Do you offer installation services?",
        answer: "Yes, we offer professional installation services for complex electronics. Contact us for pricing and availability in your area."
      }
    ]
  };

  const allFaqs = Object.values(faqData).flat();

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-dark mb-3">
              <i className="bi bi-chat-quote text-warning me-3"></i>
              Frequently Asked Questions
            </h1>
            <p className="lead text-muted">
              Find quick answers to common questions about ElectroHub
            </p>
          </div>

          {/* Category Filter */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="d-flex flex-wrap justify-content-center gap-2">
                <button
                  className={`btn ${activeCategory === 'all' ? 'btn-warning' : 'btn-outline-warning'}`}
                  onClick={() => setActiveCategory('all')}
                >
                  All Questions
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

          {/* FAQ Section */}
          <div className="row">
            <div className="col-12">
              <div className="accordion" id="faqAccordion">
                {(activeCategory === 'all' ? allFaqs : faqData[activeCategory] || []).map((faq, index) => (
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
            </div>
          </div>

          {/* Still Need Help */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="card border-0 bg-light">
                <div className="card-body text-center p-5">
                  <h4 className="fw-bold mb-3">Still Have Questions?</h4>
                  <p className="text-muted mb-4">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <div className="d-flex justify-content-center gap-3">
                    <a href="/contact" className="btn btn-warning btn-lg">
                      <i className="bi bi-envelope me-2"></i>
                      Contact Us
                    </a>
                    <a href="/help" className="btn btn-outline-warning btn-lg">
                      <i className="bi bi-question-circle me-2"></i>
                      Help Center
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

export default FAQ; 