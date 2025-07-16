import React from "react";

const Footer = () => (
  <footer className="bg-white border-top py-4 mt-5">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-4 text-primary fw-bold mb-2 mb-md-0">⚡ The ElectroHub</div>
        <div className="col-md-4 mb-2 mb-md-0">
          <div className="d-flex justify-content-center gap-3">
            <a href="#home" className="text-decoration-none text-secondary">Home</a>
            <a href="#projects" className="text-decoration-none text-secondary">Projects</a>
            <a href="#tutorials" className="text-decoration-none text-secondary">Tutorials</a>
            <a href="#about" className="text-decoration-none text-secondary">About</a>
          </div>
        </div>
        <div className="col-md-4 text-end text-secondary small">
          © {new Date().getFullYear()} ElectroHub. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
);

export default Footer; 