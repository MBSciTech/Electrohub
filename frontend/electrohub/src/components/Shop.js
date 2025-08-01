import React, { useEffect, useState } from 'react';
import Carousel from './Carousel';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Shop = ({ onCartUpdate }) => {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to load products:', err));
  }, []);

  useEffect(() => {
    fetch('/api/banners')
      .then(res => res.json())
      .then(data => setBanners(data))
      .catch(err => console.error('Failed to load banners:', err));
  }, []);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = existingCart.findIndex(p => p._id === product._id);

    if (index >= 0) {
      existingCart[index].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));

    // Notify parent (App) to update navbar count
    if (onCartUpdate) {
      onCartUpdate(existingCart.reduce((acc, item) => acc + item.quantity, 0));
    }
  };

  const aStyle = {
    textDecoration: 'none',
    color: 'black'
  };

  return (
    <>
      <Carousel banners={banners} />

      <div className="container my-5">
        {/* Products Grid */}
        <div className="row g-4">
          {products.map((product, idx) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={idx}>
              <div
                style={{ boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.18)' }}
                className="card h-100 border-0"
              >
                <img
                  src={product.image}
                  className="card-img-top bg-white"
                  alt={product.name}
                  style={{
                    height: '200px',
                    objectFit: 'contain',
                    padding: '10px',
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-1">
                    <Link style={aStyle} to={`/product/${product._id}`}>
                      {product.name}
                    </Link>
                  </h5>
                  {product.category && (
                    <span className="badge bg-secondary mb-2" style={{ width: 'fit-content' }}>
                      {product.category}
                    </span>
                  )}
                  <p className="text-success fw-bold mb-1">₹{product.price}</p>
                  <p className="card-text text-muted small">
                    {product.description?.slice(0, 60)}...
                  </p>
                  <button
                    className="btn btn-outline-primary mt-auto"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Shop;
