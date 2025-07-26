// src/components/Carousel.js
import React from 'react';

const Carousel = ({ banners }) => {
  return (
    <div
      id="shopCarousel"
      className="carousel slide mb-5 rounded overflow-hidden shadow"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {banners.map((banner, idx) => (
          <div className={`carousel-item${idx === 0 ? ' active' : ''}`} key={banner._id}>
            <div className="position-relative">
              <img
                src={banner.image}
                className="d-block w-100"
                alt={banner.name}
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#shopCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#shopCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
