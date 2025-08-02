import React, { useState } from 'react';

const Returns = () => {
  const [returnForm, setReturnForm] = useState({
    orderNumber: '',
    reason: '',
    description: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleFormChange = (e) => {
    setReturnForm({
      ...returnForm,
      [e.target.name]: e.target.value
    });
  };

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('Return request submitted successfully! We\'ll email you a return label within 24 hours.');
    setReturnForm({ orderNumber: '', reason: '', description: '' });
    setTimeout(() => setSubmitStatus(''), 5000);
  };

  const returnReasons = [
    'Defective or damaged item',
    'Wrong item received',
    'Item not as described',
    'Changed my mind',
    'Size doesn\'t fit',
    'Better alternative found',
    'Other'
  ];

  const returnPolicy = {
    timeLimit: '30 days from delivery',
    condition: 'Original condition with all packaging',
    exclusions: [
      'Personalized or custom items',
      'Software and digital downloads',
      'Gift cards',
      'Items marked as non-returnable'
    ],
    process: [
      'Submit return request online',
      'Receive return label via email',
      'Package item securely',
      'Drop off at shipping location',
      'Refund processed within 5-7 days'
    ]
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-dark mb-3">
              <i className="bi bi-arrow-return-left text-warning me-3"></i>
              Returns & Refunds
            </h1>
            <p className="lead text-muted">
              Easy returns and fast refunds. We want you to be completely satisfied with your purchase.
            </p>
          </div>

          {/* Return Policy Overview */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h3 className="fw-bold mb-4">Return Policy</h3>
                  <div className="row">
                    <div className="col-md-4 text-center mb-4">
                      <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                        <i className="bi bi-calendar-check text-white fs-1"></i>
                      </div>
                      <h5 className="fw-bold">30-Day Returns</h5>
                      <p className="text-muted">Return window from delivery date</p>
                    </div>
                    <div className="col-md-4 text-center mb-4">
                      <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                        <i className="bi bi-currency-dollar text-white fs-1"></i>
                      </div>
                      <h5 className="fw-bold">Free Returns</h5>
                      <p className="text-muted">We cover return shipping costs</p>
                    </div>
                    <div className="col-md-4 text-center mb-4">
                      <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                        <i className="bi bi-lightning text-white fs-1"></i>
                      </div>
                      <h5 className="fw-bold">Fast Refunds</h5>
                      <p className="text-muted">Processed within 5-7 business days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Return Process */}
          <div className="row mb-5">
            <div className="col-12">
              <h3 className="fw-bold mb-4">How to Return</h3>
              <div className="row g-4">
                {returnPolicy.process.map((step, index) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body text-center p-4">
                        <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                          <span className="text-white fw-bold fs-5">{index + 1}</span>
                        </div>
                        <h6 className="fw-bold">{step}</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Return Form */}
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h3 className="fw-bold mb-4">Start a Return</h3>
                  
                  {submitStatus && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                      <i className="bi bi-check-circle me-2"></i>
                      {submitStatus}
                      <button type="button" className="btn-close" onClick={() => setSubmitStatus('')}></button>
                    </div>
                  )}

                  <form onSubmit={handleReturnSubmit}>
                    <div className="mb-3">
                      <label htmlFor="orderNumber" className="form-label fw-bold">Order Number *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="orderNumber"
                        name="orderNumber"
                        placeholder="Enter your order number"
                        value={returnForm.orderNumber}
                        onChange={handleFormChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="reason" className="form-label fw-bold">Return Reason *</label>
                      <select
                        className="form-select"
                        id="reason"
                        name="reason"
                        value={returnForm.reason}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="">Select a reason</option>
                        {returnReasons.map((reason, index) => (
                          <option key={index} value={reason}>{reason}</option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="description" className="form-label fw-bold">Additional Details</label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="4"
                        placeholder="Please provide any additional details about your return..."
                        value={returnForm.description}
                        onChange={handleFormChange}
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-warning btn-lg px-4">
                      <i className="bi bi-arrow-return-left me-2"></i>
                      Submit Return Request
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Return Conditions */}
          <div className="row mb-5">
            <div className="col-12">
              <h3 className="fw-bold mb-4">Return Conditions</h3>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body p-4">
                      <h5 className="fw-bold mb-3 text-success">
                        <i className="bi bi-check-circle me-2"></i>
                        What We Accept
                      </h5>
                      <ul className="list-unstyled">
                        <li className="mb-2">• Items in original condition</li>
                        <li className="mb-2">• All original packaging and accessories</li>
                        <li className="mb-2">• Unused and unopened items</li>
                        <li className="mb-2">• Items within 30 days of delivery</li>
                        <li className="mb-2">• Items with all tags and labels attached</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body p-4">
                      <h5 className="fw-bold mb-3 text-danger">
                        <i className="bi bi-x-circle me-2"></i>
                        What We Don't Accept
                      </h5>
                      <ul className="list-unstyled">
                        {returnPolicy.exclusions.map((exclusion, index) => (
                          <li key={index} className="mb-2">• {exclusion}</li>
                        ))}
                        <li className="mb-2">• Items showing signs of use or damage</li>
                        <li className="mb-2">• Items missing parts or accessories</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Information */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="card border-0 bg-light">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-3">
                    <i className="bi bi-currency-dollar text-warning me-2"></i>
                    Refund Information
                  </h4>
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="fw-bold mb-2">Refund Timeline</h6>
                      <ul className="list-unstyled">
                        <li className="mb-1">• Processing: 1-2 business days</li>
                        <li className="mb-1">• Bank processing: 3-5 business days</li>
                        <li className="mb-1">• Total time: 5-7 business days</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h6 className="fw-bold mb-2">Refund Method</h6>
                      <ul className="list-unstyled">
                        <li className="mb-1">• Original payment method</li>
                        <li className="mb-1">• Store credit available</li>
                        <li className="mb-1">• Gift cards for gift purchases</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="row">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center p-5">
                  <h4 className="fw-bold mb-3">Need Help with Returns?</h4>
                  <p className="text-muted mb-4">
                    Have questions about your return or refund? Our customer service team is here to help.
                  </p>
                  <div className="d-flex justify-content-center gap-3">
                    <a href="/contact" className="btn btn-warning btn-lg">
                      <i className="bi bi-envelope me-2"></i>
                      Contact Support
                    </a>
                    <a href="tel:+15551234567" className="btn btn-outline-warning btn-lg">
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

export default Returns; 