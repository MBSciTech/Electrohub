import React from "react";
import { Link } from 'react-router-dom';

const HeroSection = () => (
  <section className="bg-light py-5" id="home">
    <div className="container text-center py-5">
      <h1 className="display-4 fw-bold mb-3">Empowering the Future, One Circuit at a Time</h1>
      <p className="lead mb-4">A MERN-powered platform for electronics learners, makers, and innovators.</p>
      <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mb-4">
        <Link to="/signup" className="btn btn-primary btn-lg">Get Started</Link>
        <a href="#projects" className="btn btn-outline-primary btn-lg">Browse Projects</a>
      </div>
      {/* Optional illustration */}
      <div className="mt-4">
        <img src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png" alt="Electronics" width="120" height="120" />
      </div>
    </div>
  </section>
);

export default HeroSection; 