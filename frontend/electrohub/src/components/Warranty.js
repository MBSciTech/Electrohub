import React, { useState } from 'react';

const Warranty = () => {
  const [warrantyForm, setWarrantyForm] = useState({
    productName: '',
    serialNumber: '',
    issue: '',
    purchaseDate: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleFormChange = (e) => {
    setWarrantyForm({
      ...warrantyForm,
      [e.target.name]: e.target.value
    });
  };

  const handleWarrantySubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('Warranty claim submitted successfully! We\'ll contact you within 24 hours.');
    setWarrantyForm({ productName: '', serialNumber: '', issue: '', purchaseDate: '' });
    setTimeout(() => setSubmitStatus(''), 5000);
  };

  const warrantyTypes = [
    {
      name: 'Standard Warranty',
      duration: '1 Year',
      coverage: 'Manufacturing defects and hardware failures',
      icon: 'bi-shield-check'
    },
    {
      name: 'Extended Warranty',
      duration: '2-3 Years',
      coverage: 'Extended coverage for additional protection',
      icon: 'bi-shield-plus'
    },
    {
      name: 'Premium Warranty',
      duration: '3-5 Years',
      coverage: 'Comprehensive coverage with accidental damage',
      icon: 'bi-shield-star'
    }
  ];

  const warrantyCoverage = {
    covered: [
      'Manufacturing defects',
      'Hardware failures',
      'Component malfunctions',
      'Power supply issues',
      'Display problems',
      'Battery defects'
    ],
    notCovered: [
      'Accidental damage',
      'Water damage',
      'Unauthorized modifications',
      'Software issues',
      'Cosmetic damage',
      'Normal wear and tear'
    ]
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-dark mb-3">
              <i className="bi bi-shield-check text-warning me-3"></i>
              Warranty Information
            </h1>
            <p className="lead text-muted">
              Comprehensive warranty coverage to protect your investment and ensure peace of mind.
            </p>
          </div>

          {/* Warranty Types */}
          <div className="row mb-5">
            <div className="col-12">
              <h3 className="fw-bold mb-4">Warranty Options</h3>
              <div className="row g-4">
                {warrantyTypes.map((warranty, index) => (
                  <div key={index} className="col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body text-center p-4">
                        <i className={`bi ${warranty.icon} text-warning fs-1 mb-3`}></i>
                        <h5 className="fw-bold mb-2">{warranty.name}</h5>
                        <div className="mb-3">
                          <span className="h5 fw-bold text-warning">{warranty.duration}</span>
                        </div>
                        <p className="text-muted small">{warranty.coverage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Warranty Coverage */}
          <div className="row mb-5">
            <div className="col-12">
              <h3 className="fw-bold mb-4">What's Covered</h3>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body p-4">
                      <h5 className="fw-bold mb-3 text-success">
                        <i className="bi bi-check-circle me-2"></i>
                        Covered by Warranty
                      </h5>
                      <ul className="list-unstyled">
                        {warrantyCoverage.covered.map((item, index) => (
                          <li key={index} className="mb-2">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body p-4">
                      <h5 className="fw-bold mb-3 text-danger">
                        <i className="bi bi-x-circle me-2"></i>
                        Not Covered by Warranty
                      </h5>
                      <ul className="list-unstyled">
                        {warrantyCoverage.notCovered.map((item, index) => (
                          <li key={index} className="mb-2">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Warranty Claim Form */}
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h3 className="fw-bold mb-4">Submit Warranty Claim</h3>
                  
                  {submitStatus && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                      <i className="bi bi-check-circle me-2"></i>
                      {submitStatus}
                      <button type="button" className="btn-close" onClick={() => setSubmitStatus('')}></button>
                    </div>
                  )}

                  <form onSubmit={handleWarrantySubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="productName" className="form-label fw-bold">Product Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          id="productName"
                          name="productName"
                          placeholder="Enter product name"
                          value={warrantyForm.productName}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="serialNumber" className="form-label fw-bold">Serial Number *</label>
                        <input
                          type="text"
                          className="form-control"
                          id="serialNumber"
                          name="serialNumber"
                          placeholder="Enter serial number"
                          value={warrantyForm.serialNumber}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="purchaseDate" className="form-label fw-bold">Purchase Date *</label>
                        <input
                          type="date"
                          className="form-control"
                          id="purchaseDate"
                          name="purchaseDate"
                          value={warrantyForm.purchaseDate}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="issue" className="form-label fw-bold">Issue Description *</label>
                        <textarea
                          className="form-control"
                          id="issue"
                          name="issue"
                          rows="3"
                          placeholder="Describe the issue you're experiencing..."
                          value={warrantyForm.issue}
                          onChange={handleFormChange}
                          required
                        ></textarea>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-warning btn-lg px-4">
                      <i className="bi bi-shield-check me-2"></i>
                      Submit Warranty Claim
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Warranty Process */}
          <div className="row mb-5">
            <div className="col-12">
              <h3 className="fw-bold mb-4">Warranty Claim Process</h3>
              <div className="row g-4">
                <div className="col-md-3">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body text-center p-4">
                      <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                        <span className="text-white fw-bold fs-5">1</span>
                      </div>
                      <h6 className="fw-bold">Submit Claim</h6>
                      <p className="text-muted small">Fill out the warranty claim form with product details</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body text-center p-4">
                      <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                        <span className="text-white fw-bold fs-5">2</span>
                      </div>
                      <h6 className="fw-bold">Review</h6>
                      <p className="text-muted small">Our team reviews your claim within 24 hours</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body text-center p-4">
                      <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                        <span className="text-white fw-bold fs-5">3</span>
                      </div>
                      <h6 className="fw-bold">Approval</h6>
                      <p className="text-muted small">If approved, we'll provide repair or replacement options</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body text-center p-4">
                      <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                        <span className="text-white fw-bold fs-5">4</span>
                      </div>
                      <h6 className="fw-bold">Resolution</h6>
                      <p className="text-muted small">Repair, replacement, or refund as appropriate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Warranty Terms */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="card border-0 bg-light">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-3">
                    <i className="bi bi-file-text text-warning me-2"></i>
                    Warranty Terms & Conditions
                  </h4>
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="fw-bold mb-2">Standard Terms</h6>
                      <ul className="list-unstyled">
                        <li className="mb-1">• Warranty starts from date of purchase</li>
                        <li className="mb-1">• Original purchaser only</li>
                        <li className="mb-1">• Proof of purchase required</li>
                        <li className="mb-1">• Non-transferable warranty</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h6 className="fw-bold mb-2">Service Options</h6>
                      <ul className="list-unstyled">
                        <li className="mb-1">• Repair at authorized service center</li>
                        <li className="mb-1">• Replacement with equivalent product</li>
                        <li className="mb-1">• Refund for defective items</li>
                        <li className="mb-1">• Shipping costs covered by us</li>
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
                  <h4 className="fw-bold mb-3">Need Help with Warranty?</h4>
                  <p className="text-muted mb-4">
                    Have questions about your warranty coverage or claim status? Our support team is here to help.
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

export default Warranty; 