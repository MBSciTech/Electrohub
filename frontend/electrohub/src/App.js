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
  import ContactUs from './components/ContactUs';
  import HelpCenter from './components/HelpCenter';
  import ShippingInfo from './components/ShippingInfo';
  import Returns from './components/Returns';
  import Warranty from './components/Warranty';
  import FAQ from './components/FAQ';
  import PrivacyPolicy from './components/PrivacyPolicy';
  import TermsOfService from './components/TermsOfService';
  import CookiePolicy from './components/CookiePolicy';
  import Sitemap from './components/Sitemap';
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
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/shipping" element={<ShippingInfo />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/warranty" element={<Warranty />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/sitemap" element={<Sitemap />} />
        </Routes>
      </Router> 
    );
  }

  export default App;
