import React from "react";

const Footer = () => (
  <footer className="bg-dark text-light py-5 mt-5 border-top shadow-sm w-100">
    <div className="container-fluid px-5">
      <div className="row g-4">
        {/* Brand Info */}
        <div className="col-md-4">
          <h5 className="text-uppercase mb-3">⚡ ElectroHub</h5>
          <p className="small text-muted">
            Your one-stop destination for electronics, tutorials, and tech tips.
          </p>
        </div>

        {/* Quick Links */}
        <div className="col-md-4">
          <h6 className="text-uppercase mb-3">Quick Links</h6>
          <ul className="list-unstyled">
            <li><a href="/" className="text-decoration-none text-light">Home</a></li>
            <li><a href="/about" className="text-decoration-none text-light">About</a></li>
            <li><a href="/staff" className="text-decoration-none text-light">Only Staff</a></li>

          </ul>
        </div>

        {/* Social & Copyright */}
        <div className="col-md-4">
          <h6 className="text-uppercase mb-3">Connect</h6>
          <div className="d-flex gap-3 mb-3">
            <a href="#" className="text-light"><i className="bi bi-facebook"></i></a>
            <a href="#" className="text-light"><i className="bi bi-instagram"></i></a>
            <a href="#" className="text-light"><i className="bi bi-twitter"></i></a>
            <a href="#" className="text-light"><i className="bi bi-github"></i></a>
          </div>
          <div className="small text-muted">
            © {new Date().getFullYear()} ElectroHub. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
