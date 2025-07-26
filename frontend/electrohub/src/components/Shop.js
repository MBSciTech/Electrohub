import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from './Carousel';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  useEffect(() => {
    fetch('/api/banners')
      .then(res => res.json())
      .then(data => setBanners(data));
  }, []);

  const aStyle = {
    textDecoration: 'none',
    color: 'black'
  }

  return (
    <div className="container my-5">
      {/* Hero Carousel */}
      <Carousel banners={banners} />

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
                <button className="btn btn-outline-primary mt-auto">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center mt-5">
          <h4 className="text-muted">No products available.</h4>
        </div>
      )}
    </div>
  );
};

export default Shop;
