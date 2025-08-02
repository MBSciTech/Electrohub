import React, { useState } from 'react';

const ShippingInfo = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  const handleTrackingSubmit = (e) => {
    e.preventDefault();
    // Simulate tracking lookup
    setTrackingResult({
      status: 'In Transit',
      location: 'Distribution Center',
      estimatedDelivery: '2024-01-15',
      updates: [
        { date: '2024-01-12', time: '10:30 AM', status: 'Package picked up', location: 'Origin Facility' },
        { date: '2024-01-13', time: '2:15 PM', status: 'In transit', location: 'Distribution Center' },
        { date: '2024-01-14', time: '9:45 AM', status: 'Out for delivery', location: 'Local Facility' }
      ]
    });
  };

  const shippingOptions = [
    {
      name: 'Standard Shipping',
      price: '$5.99',
      time: '3-5 business days',
      description: 'Free on orders over $50',
      icon: 'bi-truck'
    },
    {
      name: 'Express Shipping',
      price: '$12.99',
      time: '1-2 business days',
      description: 'Priority handling and tracking',
      icon: 'bi-lightning'
    },
    {
      name: 'Overnight Shipping',
      price: '$24.99',
      time: 'Next business day',
      description: 'Guaranteed next-day delivery',
      icon: 'bi-rocket'
    }
  ];

  const shippingZones = [
    {
      zone: 'Continental US',
      time: '3-5 business days',
      cost: '$5.99',
      freeThreshold: '$50'
    },
    {
      zone: 'Alaska & Hawaii',
      time: '5-7 business days',
      cost: '$12.99',
      freeThreshold: '$75'
    },
    {
      zone: 'Puerto Rico',
      time: '7-10 business days',
      cost: '$15.99',
      freeThreshold: '$100'
    }
  ];

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-dark mb-3">
              <i className="bi bi-truck text-warning me-3"></i>
              Shipping Information
            </h1>
            <p className="lead text-muted">
              Fast, reliable shipping to get your electronics to you quickly and safely
            </p>
          </div>

          {/* Shipping Options */}
          <div className="row mb-5">
            <div className="col-12">
              <h3 className="fw-bold mb-4">Shipping Options</h3>
              <div className="row g-4">
                {shippingOptions.map((option, index) => (
                  <div key={index} className="col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body text-center p-4">
                        <i className={`bi ${option.icon} text-warning fs-1 mb-3`}></i>
                        <h5 className="fw-bold mb-2">{option.name}</h5>
                        <div className="mb-3">
                          <span className="h4 fw-bold text-warning">{option.price}</span>
                          <span className="text-muted"> / order</span>
                        </div>
                        <p className="text-muted mb-2">{option.time}</p>
                        <p className="small text-muted">{option.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shipping Zones */}
          <div className="row mb-5">
            <div className="col-12">
              <h3 className="fw-bold mb-4">Shipping Zones & Rates</h3>
              <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th className="border-0 fw-bold">Zone</th>
                          <th className="border-0 fw-bold">Delivery Time</th>
                          <th className="border-0 fw-bold">Cost</th>
                          <th className="border-0 fw-bold">Free Shipping Threshold</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shippingZones.map((zone, index) => (
                          <tr key={index}>
                            <td className="fw-bold">{zone.zone}</td>
                            <td>{zone.time}</td>
                            <td className="text-warning fw-bold">{zone.cost}</td>
                            <td>Orders over {zone.freeThreshold}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Package Tracking */}
          <div className="row mb-5">
            <div className="col-12">
              <h3 className="fw-bold mb-4">Track Your Package</h3>
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <form onSubmit={handleTrackingSubmit} className="row g-3">
                    <div className="col-md-8">
                      <label htmlFor="trackingNumber" className="form-label fw-bold">Tracking Number</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="trackingNumber"
                        placeholder="Enter your tracking number"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-4 d-flex align-items-end">
                      <button type="submit" className="btn btn-warning btn-lg w-100">
                        <i className="bi bi-search me-2"></i>
                        Track Package
                      </button>
                    </div>
                  </form>

                  {trackingResult && (
                    <div className="mt-4">
                      <div className="alert alert-info">
                        <h6 className="fw-bold mb-2">Package Status: {trackingResult.status}</h6>
                        <p className="mb-1">Current Location: {trackingResult.location}</p>
                        <p className="mb-0">Estimated Delivery: {trackingResult.estimatedDelivery}</p>
                      </div>
                      
                      <h6 className="fw-bold mt-4 mb-3">Tracking Updates</h6>
                      <div className="timeline">
                        {trackingResult.updates.map((update, index) => (
                          <div key={index} className="d-flex mb-3">
                            <div className="bg-warning rounded-circle p-2 me-3" style={{width: '40px', height: '40px'}}>
                              <i className="bi bi-check text-white"></i>
                            </div>
                            <div>
                              <h6 className="fw-bold mb-1">{update.status}</h6>
                              <p className="text-muted small mb-1">{update.location}</p>
                              <p className="text-muted small mb-0">{update.date} at {update.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="row mb-5">
            <div className="col-12">
              <h3 className="fw-bold mb-4">Important Shipping Information</h3>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body p-4">
                      <h5 className="fw-bold mb-3">
                        <i className="bi bi-box-seam text-warning me-2"></i>
                        Packaging
                      </h5>
                      <ul className="list-unstyled">
                        <li className="mb-2">• All items are carefully packaged to prevent damage</li>
                        <li className="mb-2">• Electronics are wrapped in anti-static materials</li>
                        <li className="mb-2">• Fragile items receive extra protection</li>
                        <li className="mb-2">• Packages are sealed with tamper-evident tape</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body p-4">
                      <h5 className="fw-bold mb-3">
                        <i className="bi bi-calendar-check text-warning me-2"></i>
                        Delivery
                      </h5>
                      <ul className="list-unstyled">
                        <li className="mb-2">• Signature required for orders over $200</li>
                        <li className="mb-2">• Delivery attempts made during business hours</li>
                        <li className="mb-2">• Packages held at local facility if undeliverable</li>
                        <li className="mb-2">• Real-time tracking updates via email</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* International Shipping */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="card border-0 bg-light">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-3">
                    <i className="bi bi-globe text-warning me-2"></i>
                    International Shipping
                  </h4>
                  <p className="text-muted mb-3">
                    Currently, we only ship within the United States and its territories. 
                    We're working on expanding our international shipping options. 
                    Please check back soon for updates.
                  </p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-warning">
                      <i className="bi bi-bell me-2"></i>
                      Notify When Available
                    </button>
                    <a href="/contact" className="btn btn-outline-secondary">
                      <i className="bi bi-envelope me-2"></i>
                      Contact for Inquiries
                    </a>
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
                  <h4 className="fw-bold mb-3">Need Help with Shipping?</h4>
                  <p className="text-muted mb-4">
                    Have questions about your order or shipping status? Our customer service team is here to help.
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

export default ShippingInfo; 