import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaCreditCard, FaPaypal, FaLock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUser, FaShieldAlt } from 'react-icons/fa';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    saveInfo: false
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const loginStatus = localStorage.getItem('isLoggedIn');
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('userName');

    if (loginStatus !== 'true' || !email) {
      navigate('/login');
      return;
    }

    setIsLoggedIn(true);
    setUserEmail(email);
    setUserName(name || '');

    // Load cart data
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartData.length === 0) {
      navigate('/cart');
      return;
    }

    setCart(cartData);
    
    // Calculate total
    const totalPrice = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(totalPrice);

    // Pre-fill form with user data
    setFormData(prev => ({
      ...prev,
      firstName: name ? name.split(' ')[0] : '',
      lastName: name ? name.split(' ').slice(1).join(' ') : '',
      email: email
    }));
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Card validation if payment method is card
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date is required';
      if (!formData.cardCvv.trim()) newErrors.cardCvv = 'CVV is required';

      // Card number validation
      if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }

      // CVV validation
      if (formData.cardCvv && !/^\d{3,4}$/.test(formData.cardCvv)) {
        newErrors.cardCvv = 'Please enter a valid CVV';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate order ID
      const newOrderId = 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
      setOrderId(newOrderId);

      // Clear cart
      localStorage.removeItem('cart');
      setCart([]);

      // Save order to localStorage (in a real app, this would go to the database)
      const order = {
        id: newOrderId,
        userEmail: userEmail,
        items: cart,
        total: finalTotal,
        discount: discount,
        appliedCoupon: appliedCoupon,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        paymentMethod: formData.paymentMethod,
        orderDate: new Date().toISOString(),
        status: 'Processing'
      };

      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      setOrderPlaced(true);
    } catch (error) {
      console.error('Order placement failed:', error);
      alert('Order placement failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const finalTotal = total - (total * discount / 100);
  const shippingCost = finalTotal > 500 ? 0 : 50;
  const grandTotal = finalTotal + shippingCost;

  if (orderPlaced) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow text-center">
              <div className="card-body p-5">
                <div className="mb-4">
                  <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                    <FaShieldAlt size={40} className="text-white" />
                  </div>
                  <h2 className="text-success mb-3">Order Placed Successfully!</h2>
                  <p className="text-muted mb-4">Thank you for your purchase. Your order has been confirmed.</p>
                </div>

                <div className="alert alert-light">
                  <h5 className="mb-2">Order Details</h5>
                  <p className="mb-1"><strong>Order ID:</strong> {orderId}</p>
                  <p className="mb-1"><strong>Total Amount:</strong> ₹{grandTotal.toFixed(2)}</p>
                  <p className="mb-0"><strong>Status:</strong> Processing</p>
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-3">
                    You will receive an email confirmation shortly. We'll keep you updated on your order status.
                  </p>
                  <div className="d-grid gap-2">
                    <Link to="/orders" className="btn btn-primary">
                      View My Orders
                    </Link>
                    <Link to="/shop" className="btn btn-outline-secondary">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                <FaLock className="me-2" />
                Secure Checkout
              </h3>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                {/* Shipping Information */}
                <div className="mb-4">
                  <h5 className="mb-3">
                    <FaMapMarkerAlt className="me-2 text-primary" />
                    Shipping Information
                  </h5>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">First Name *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                      />
                      {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Last Name *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                      />
                      {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Address *</label>
                    <textarea
                      className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Enter your full address"
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Enter city"
                      />
                      {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">State *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Enter state"
                      />
                      {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">ZIP Code *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="Enter ZIP code"
                      />
                      {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-4">
                  <h5 className="mb-3">
                    <FaCreditCard className="me-2 text-primary" />
                    Payment Method
                  </h5>
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="card"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="card">
                        <FaCreditCard className="me-2" />
                        Credit/Debit Card
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="paypal"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="paypal">
                        <FaPaypal className="me-2" />
                        PayPal
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="card border">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12 mb-3">
                            <label className="form-label">Card Number *</label>
                            <input
                              type="text"
                              className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              placeholder="1234 5678 9012 3456"
                              maxLength="19"
                            />
                            {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                          </div>
                          <div className="col-12 mb-3">
                            <label className="form-label">Cardholder Name *</label>
                            <input
                              type="text"
                              className={`form-control ${errors.cardName ? 'is-invalid' : ''}`}
                              name="cardName"
                              value={formData.cardName}
                              onChange={handleInputChange}
                              placeholder="Enter cardholder name"
                            />
                            {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Expiry Date *</label>
                            <input
                              type="text"
                              className={`form-control ${errors.cardExpiry ? 'is-invalid' : ''}`}
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              placeholder="MM/YY"
                              maxLength="5"
                            />
                            {errors.cardExpiry && <div className="invalid-feedback">{errors.cardExpiry}</div>}
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">CVV *</label>
                            <input
                              type="text"
                              className={`form-control ${errors.cardCvv ? 'is-invalid' : ''}`}
                              name="cardCvv"
                              value={formData.cardCvv}
                              onChange={handleInputChange}
                              placeholder="123"
                              maxLength="4"
                            />
                            {errors.cardCvv && <div className="invalid-feedback">{errors.cardCvv}</div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'paypal' && (
                    <div className="alert alert-info">
                      <FaPaypal className="me-2" />
                      You will be redirected to PayPal to complete your payment after placing the order.
                    </div>
                  )}
                </div>

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="saveInfo"
                    id="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="saveInfo">
                    Save this information for next time
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <FaLock className="me-2" />
                      Place Order - ₹{grandTotal.toFixed(2)}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card shadow sticky-top" style={{ top: '2rem' }}>
            <div className="card-header bg-light">
              <h5 className="mb-0">
                <FaUser className="me-2" />
                Order Summary
              </h5>
            </div>
            <div className="card-body">
              {cart.map(item => (
                <div key={item._id} className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                      className="me-2"
                    />
                    <div>
                      <small className="fw-bold">{item.name}</small>
                      <br />
                      <small className="text-muted">Qty: {item.quantity}</small>
                    </div>
                  </div>
                  <small className="fw-bold">₹{(item.price * item.quantity).toFixed(2)}</small>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Discount ({discount}%):</span>
                  <span>-₹{(total * discount / 100).toFixed(2)}</span>
                </div>
              )}

              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost.toFixed(2)}`}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-primary">₹{grandTotal.toFixed(2)}</strong>
              </div>

              <div className="alert alert-success small">
                <FaShieldAlt className="me-1" />
                <strong>Secure Payment:</strong> Your payment information is encrypted and secure.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 