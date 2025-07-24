import React, { useEffect, useState } from 'react';

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

  return (
    <div className="container mt-5">
      {/* Carousel */}
      <div id="shopCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
        <div className="carousel-inner">
          {banners.map((banner, idx) => (
            <div className={`carousel-item${idx === 0 ? ' active' : ''}`} key={banner._id}>
              <img src={banner.image} className="d-block w-100" alt={banner.name} style={{maxHeight: '350px', objectFit: 'cover'}} />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#shopCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#shopCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <h2 className="mb-4 text-center text-primary">Welcome to the ElectroHub Shop!</h2>
      <p className="lead text-center mb-5">Discover the latest and greatest in electronics, handpicked for tech enthusiasts. Shop smartphones, wearables, audio, and more!</p>
      <div className="row g-4">
        {products.map((product, idx) => (
          <div className="col-12 col-sm-6 col-md-3" key={idx}>
            <div className="card h-100 shadow-sm">
              <img src={product.image} className="card-img-top" alt={product.name} style={{height: '180px', objectFit: 'cover'}} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text fw-bold text-success mb-2">{product.price}</p>
                <button className="btn btn-primary mt-auto" disabled>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop; 