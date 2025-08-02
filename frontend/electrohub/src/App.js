  import React, { useState } from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import LandingPage from './components/LandingPage';
  import Login from './components/Login';
  import Signup from './components/Signup';
  import Shop from './components/Shop';
  import Cart from './components/Cart';
  import Checkout from './components/Checkout';
  import Navbar from './components/Navbar';
  import StaffPanel from './components/StaffPanel';
  import ProductPage from './components/ProductPage';
  import Profile from './components/Profile';
  import Orders from './components/Orders';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap/dist/js/bootstrap.bundle.min.js';
  import 'bootstrap-icons/font/bootstrap-icons.css';

  function App() {
    // Initialize cart count from localStorage
    const [cartCount, setCartCount] = useState(() => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      return cart.reduce((acc, item) => acc + item.quantity, 0);
    });

    return (
      <Router>
        <Navbar cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shop" element={<Shop onCartUpdate={setCartCount} />} />
          <Route path="/staff" element={<StaffPanel />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart onCartUpdate={setCartCount} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Router> 
    );
  }

  export default App;
