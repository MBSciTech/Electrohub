import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa'; // FontAwesome icons

const Navbar = ({ cartCount = 0 }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status on component mount and when localStorage changes
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn');
      const userEmail = localStorage.getItem('email');
      const storedUserName = localStorage.getItem('userName');
      
      setIsLoggedIn(loginStatus === 'true' && userEmail);
      setUserName(storedUserName || '');
    };

    checkLoginStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('cart'); // Also clear cart on logout
    
    // Update state
    setIsLoggedIn(false);
    setUserName('');
    
    // Navigate to home page
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          <span className="me-2">⚡</span> The ElectroHub
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop">Shop</Link>
            </li>
            
            
            {/* Show different content based on login status */}
            {isLoggedIn ? (
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaUser className="me-1" />
                    {userName || 'User'}
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><Link className="dropdown-item" to="/orders">My Orders</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <FaSignOutAlt className="me-1" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
                <li className="nav-item position-relative">
                  <Link className="nav-link" to="/cart">
                    <FaShoppingCart size={20} />
                    {cartCount > 0 && (
                      <span className="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
                <li className="nav-item position-relative">
                  <Link className="nav-link" to="/cart">
                    <FaShoppingCart size={20} />
                    {cartCount > 0 && (
                      <span className="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
