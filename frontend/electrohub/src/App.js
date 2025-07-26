import React from 'react';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Shop from './components/Shop';
import Navbar from './components/Navbar';
import StaffPanel from './components/StaffPanel';
import ProductPage from './components/ProductPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/staff" element={<StaffPanel />} />
        <Route path="/product/:id" element={<ProductPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
