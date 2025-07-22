import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for authentication logic
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    alert(`Logged in as ${email}`);
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: 400, width: "100%" }}>
        <h2 className="mb-4 text-center">Login to ElectroHub</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="loginEmail" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="loginEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="loginPassword" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="loginPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="mt-3 text-center">
          <span>Don't have an account? </span>
          <a href="#signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login; 