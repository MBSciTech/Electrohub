import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitStatus(''), 5000);
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-dark mb-3">
              <i className="bi bi-envelope-fill text-warning me-3"></i>
              Contact Us
            </h1>
            <p className="lead text-muted">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="row g-5">
            {/* Contact Information */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">Get in Touch</h4>
                  
                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-warning rounded-circle p-2 me-3">
                        <i className="bi bi-geo-alt-fill text-white"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Address</h6>
                        <p className="text-muted small mb-0">
                          123 Tech Street<br />
                          Digital City, DC 12345
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-warning rounded-circle p-2 me-3">
                        <i className="bi bi-telephone-fill text-white"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Phone</h6>
                        <p className="text-muted small mb-0">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-warning rounded-circle p-2 me-3">
                        <i className="bi bi-envelope-fill text-white"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Email</h6>
                        <p className="text-muted small mb-0">support@electrohub.com</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="bg-warning rounded-circle p-2 me-3">
                        <i className="bi bi-clock-fill text-white"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Business Hours</h6>
                        <p className="text-muted small mb-0">
                          Mon-Fri: 9AM-6PM<br />
                          Sat: 10AM-4PM<br />
                          Sun: Closed
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h6 className="fw-bold mb-3">Follow Us</h6>
                    <div className="d-flex gap-2">
                      <a href="#" className="btn btn-outline-warning btn-sm">
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a href="#" className="btn btn-outline-warning btn-sm">
                        <i className="bi bi-instagram"></i>
                      </a>
                      <a href="#" className="btn btn-outline-warning btn-sm">
                        <i className="bi bi-twitter"></i>
                      </a>
                      <a href="#" className="btn btn-outline-warning btn-sm">
                        <i className="bi bi-linkedin"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">Send us a Message</h4>
                  
                  {submitStatus && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                      <i className="bi bi-check-circle me-2"></i>
                      {submitStatus}
                      <button type="button" className="btn-close" onClick={() => setSubmitStatus('')}></button>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label fw-bold">Full Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="email" className="form-label fw-bold">Email Address *</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="subject" className="form-label fw-bold">Subject *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="message" className="form-label fw-bold">Message *</label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us how we can help you..."
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-warning btn-lg px-4">
                      <i className="bi bi-send me-2"></i>
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs; 