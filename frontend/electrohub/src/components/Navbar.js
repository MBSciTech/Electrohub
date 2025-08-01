import React from "react";
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // FontAwesome cart icon

const Navbar = ({ cartCount = 0 }) => (
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
          <li className="nav-item">
            <a className="nav-link" href="#projects">Projects</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#tutorials">Tutorials</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#about">About</a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login / Sign Up</Link>
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
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
