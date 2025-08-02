import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaSignOutAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Added missing import for Link

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  }, [navigate]);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('cart');
    
    // Navigate to home page
    navigate('/');
  };

  if (!isLoggedIn) {
    return null; // Will redirect to login
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                <FaUser className="me-2" />
                User Profile
              </h3>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-4 text-center">
                  <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
                    <FaUser size={40} className="text-muted" />
                  </div>
                </div>
                <div className="col-md-8">
                  <h5 className="card-title">{userName}</h5>
                  <p className="text-muted mb-0">
                    <FaEnvelope className="me-2" />
                    {userEmail}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <h6 className="text-muted mb-3">Account Information</h6>
                  <div className="list-group list-group-flush">
                    <div className="list-group-item d-flex justify-content-between align-items-center">
                      <span>Name</span>
                      <span className="fw-bold">{userName}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between align-items-center">
                      <span>Email</span>
                      <span className="fw-bold">{userEmail}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between align-items-center">
                      <span>Member Since</span>
                      <span className="text-muted">Recently</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  <h6 className="text-muted mb-3">Quick Actions</h6>
                  <div className="d-grid gap-2">
                    <Link to="/orders" className="btn btn-outline-primary">
                      <FaEdit className="me-2" />
                      View My Orders
                    </Link>
                    <Link to="/cart" className="btn btn-outline-secondary">
                      <FaUser className="me-2" />
                      View Cart
                    </Link>
                    <button className="btn btn-outline-danger" onClick={handleLogout}>
                      <FaSignOutAlt className="me-2" />
                      Logout
                    </button>
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

export default Profile; 