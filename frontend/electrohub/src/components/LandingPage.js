import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hello from './Hello';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Hello />
      <div className="d-flex justify-content-center my-4">
        <button className="btn btn-primary mx-2" onClick={() => navigate('/login')}>Login</button>
        <button className="btn btn-outline-primary mx-2" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
};

export default LandingPage; 