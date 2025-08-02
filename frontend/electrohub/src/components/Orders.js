import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaClock, FaCheckCircle, FaTimesCircle, FaTruck, FaBox } from 'react-icons/fa';

const Orders = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]);
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

    // Load user's orders from database
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders/${email}`);
        if (response.ok) {
          const userOrders = await response.json();
          setOrders(userOrders);
        } else {
          console.error('Failed to fetch orders');
          setOrders([]);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [navigate]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <FaClock className="text-warning" />;
      case 'Shipped':
        return <FaTruck className="text-info" />;
      case 'Delivered':
        return <FaCheckCircle className="text-success" />;
      case 'Cancelled':
        return <FaTimesCircle className="text-danger" />;
      default:
        return <FaBox className="text-muted" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Processing': 'bg-warning',
      'Shipped': 'bg-info',
      'Delivered': 'bg-success',
      'Cancelled': 'bg-danger'
    };
    return `badge ${statusClasses[status] || 'bg-secondary'}`;
  };

  if (!isLoggedIn) {
    return null; // Will redirect to login
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">
            <FaShoppingBag className="me-2" />
            My Orders
          </h2>
          
          <div className="alert alert-info">
            <h5>Welcome, {userName}!</h5>
            <p className="mb-0">
              Track your orders and view order history here.
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Order History</h5>
              </div>
              <div className="card-body text-center py-5">
                <FaShoppingBag size={48} className="text-muted mb-3" />
                <h5 className="text-muted">No Orders Yet</h5>
                <p className="text-muted">
                  Start shopping to see your orders here!
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/shop')}
                >
                  Start Shopping
                </button>
              </div>
            </div>
          ) : (
            <div className="row">
              {orders.map(order => (
                <div key={order.id} className="col-12 mb-4">
                  <div className="card shadow">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-0">
                          {getStatusIcon(order.status)} {order.id}
                        </h6>
                        <small className="text-muted">
                          Placed on {new Date(order.orderDate).toLocaleDateString()}
                        </small>
                      </div>
                      <span className={getStatusBadge(order.status)}>
                        {order.status}
                      </span>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-8">
                          <h6 className="mb-3">Order Items:</h6>
                          {order.items.map(item => (
                            <div key={item._id} className="d-flex justify-content-between align-items-center mb-2">
                              <div className="d-flex align-items-center">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                                  className="me-3"
                                />
                                <div>
                                  <strong>{item.name}</strong>
                                  <br />
                                  <small className="text-muted">Qty: {item.quantity}</small>
                                </div>
                              </div>
                              <span className="fw-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="col-md-4">
                          <h6 className="mb-3">Order Summary:</h6>
                          <div className="d-flex justify-content-between mb-2">
                            <span>Subtotal:</span>
                            <span>₹{order.total.toFixed(2)}</span>
                          </div>
                          {order.discount > 0 && (
                            <div className="d-flex justify-content-between mb-2 text-success">
                              <span>Discount:</span>
                              <span>-₹{(order.total * order.discount / 100).toFixed(2)}</span>
                            </div>
                          )}
                          <hr />
                          <div className="d-flex justify-content-between mb-2">
                            <strong>Total:</strong>
                            <strong className="text-primary">₹{order.total.toFixed(2)}</strong>
                          </div>
                          
                          <h6 className="mb-2 mt-3">Shipping Address:</h6>
                          <small className="text-muted">
                            {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                            {order.shippingAddress.address}<br />
                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                            {order.shippingAddress.country}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders; 