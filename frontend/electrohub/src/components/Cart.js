import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ onCartUpdate }) => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [total, setTotal] = useState(0);
  const [offers, setOffers] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(totalPrice);
    localStorage.setItem('cart', JSON.stringify(cart));

    if (onCartUpdate) {
      const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
      onCartUpdate(totalQty);
    }
  }, [cart, onCartUpdate]);

  // Fetch coupons with better error handling
  useEffect(() => {
    const fetchCoupons = async () => {
      if (!userEmail) {
        console.log('No user email found, skipping coupon fetch');
        return;
      }

      setLoading(true);
      try {
        console.log('Fetching coupons for user:', userEmail);
        const response = await fetch(`/api/users/${userEmail}/coupons`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Coupons fetched successfully:', data);
        setOffers(data);
      } catch (err) {
        console.error('Failed to fetch coupons:', err);
        setError('Failed to load coupons. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [userEmail]);

  const increment = (id) => {
    setCart(prev => prev.map(item => item._id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decrement = (id) => {
    setCart(prev => prev.map(item =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const remove = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  const handleApplyCoupon = () => {
    const coupon = offers.find(c => c.code.toLowerCase() === couponCode.trim().toLowerCase());

    if (!coupon) {
      setError('Invalid or expired coupon.');
      setDiscount(0);
      setAppliedCoupon(null);
      return;
    }

    setDiscount(coupon.discount);
    setAppliedCoupon(coupon);
    setError('');
  };

  const finalTotal = total - (total * discount / 100);

  return (
    <div className="container my-5">
      <h2 className="mb-4">
        <i className="bi bi-cart-fill me-2"></i> Your Cart
      </h2>

      {cart.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th style={{ minWidth: '140px' }}>Quantity</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ height: '60px', objectFit: 'contain', marginRight: '10px' }}
                        className="me-2"
                      />
                      {item.name}
                    </td>
                    <td>₹{item.price}</td>
                    <td>
                      <div className="btn-group gap-1">
                        <button className="btn btn-sm btn-outline-warning" onClick={() => decrement(item._id)}>
                          <i className="bi bi-dash-lg"></i>
                        </button>
                        <span className="btn btn-sm btn-light">{item.quantity}</span>
                        <button className="btn btn-sm btn-outline-warning" onClick={() => increment(item._id)}>
                          <i className="bi bi-plus-lg"></i>
                        </button>
                      </div>
                    </td>
                    <td>₹{item.price * item.quantity}</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => remove(item._id)}>
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Coupon Section */}
          <div className="row mt-4">
            <div className="col-md-6">
              <h5>Available Coupons</h5>
              {!userEmail ? (
                <div className="alert alert-warning">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Please log in to view available coupons.
                </div>
              ) : loading ? (
                <div className="text-muted">Loading coupons...</div>
              ) : offers.length === 0 ? (
                <div className="text-muted">
                  No available coupons for {userEmail}. 
                  <br />
                  <small className="text-muted">Contact support to get coupons.</small>
                </div>
              ) : (
                <ul className="list-group">
                  {offers.map(offer => (
                    <li key={offer._id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{offer.name}</strong> – <code>{offer.code}</code><br />
                        {offer.discount}% off until {new Date(offer.expiryDate).toLocaleDateString()}
                      </div>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setCouponCode(offer.code)}
                      >
                        Use
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="col-md-6">
              <h5>Apply Coupon</h5>
              {!userEmail ? (
                <div className="alert alert-warning">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Please log in to apply coupons.
                </div>
              ) : (
                <>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                    />
                    <button className="btn btn-dark" onClick={handleApplyCoupon}>Apply</button>
                  </div>
                  {error && <div className="text-danger">{error}</div>}
                  {appliedCoupon && (
                    <div className="text-success">
                      <i className="bi bi-check-circle me-1"></i> Applied <code>{appliedCoupon.code}</code> ({appliedCoupon.discount}% OFF)
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Totals */}
          <div className="text-end mt-4">
            <h5>Total: ₹{total.toFixed(2)}</h5>
            {discount > 0 && (
              <h5 className="text-success">
                Discount ({discount}%): -₹{(total * discount / 100).toFixed(2)}
              </h5>
            )}
            <h4 className="fw-bold">Final Total: ₹{finalTotal.toFixed(2)}</h4>
            <Link to="/checkout" className="btn btn-success mt-2">
              <i className="bi bi-bag-check-fill me-2"></i> Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
