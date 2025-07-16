import React from "react";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
    <div className="container">
      <a className="navbar-brand fw-bold text-primary" href="#home">
        <span className="me-2">⚡</span> The ElectroHub
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" href="#home">Home</a>
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
            <a className="nav-link" href="#login">Login / Sign Up</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar; 