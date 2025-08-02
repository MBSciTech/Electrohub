import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import './HomePage.css';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Simulate featured products data
  useEffect(() => {
    const products = [
      {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 7499,
        originalPrice: 10999,
        image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?w=300&h=300&fit=crop",
        rating: 4.5,
        reviews: 128
      },
      {
        id: 2,
        name: "Smart LED Desk Lamp",
        price: 3899,
        originalPrice: 5999,
        image: "https://images.pexels.com/photos/3937174/pexels-photo-3937174.jpeg?w=300&h=300&fit=crop",
        rating: 4.3,
        reviews: 95
      },
      {
        id: 3,
        name: "Portable Power Bank",
        price: 2499,
        originalPrice: 4199,
        image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?w=300&h=300&fit=crop",
        rating: 4.7,
        reviews: 203
      },
      {
        id: 4,
        name: "Wireless Charging Pad",
        price: 1999,
        originalPrice: 3299,
        image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?w=300&h=300&fit=crop",
        rating: 4.2,
        reviews: 87
      }
    ];
    setFeaturedProducts(products);
  }, []);

  const heroSlides = [
    {
      title: "Cutting-Edge Electronics",
      subtitle: "Discover the latest in technology and innovation",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?w=1200&h=600&fit=crop",
      cta: "Shop Now",
      link: "/shop"
    },
    {
      title: "Expert Tech Support",
      subtitle: "Get help from our certified technicians",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?w=1200&h=600&fit=crop",
      cta: "Learn More",
      link: "/help"
    },
    {
      title: "Free Shipping on Orders Over ₹2000",
      subtitle: "Fast delivery to your doorstep",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?w=1200&h=600&fit=crop",
      cta: "View Details",
      link: "/shipping"
    }
  ];

  const categories = [
    { name: "Smartphones", icon: "bi-phone", count: "150+" },
    { name: "Laptops", icon: "bi-laptop", count: "80+" },
    { name: "Audio", icon: "bi-headphones", count: "120+" },
    { name: "Gaming", icon: "bi-controller", count: "90+" },
    { name: "Smart Home", icon: "bi-house-gear", count: "60+" },
    { name: "Accessories", icon: "bi-tools", count: "200+" }
  ];

  const features = [
    {
      icon: "bi-truck",
      title: "Fast Shipping",
      description: "Free shipping on orders over ₹2000. Get your electronics delivered quickly and safely."
    },
    {
      icon: "bi-shield-check",
      title: "Secure Shopping",
      description: "Your data is protected with industry-standard SSL encryption and secure payment processing."
    },
    {
      icon: "bi-arrow-return-left",
      title: "Easy Returns",
      description: "30-day return policy. Not satisfied? Return it hassle-free with our simple process."
    },
    {
      icon: "bi-headset",
      title: "24/7 Support",
      description: "Our expert support team is available around the clock to help with any questions."
    }
  ];

  const reviews = [
    {
      name: "Priya Sharma",
      rating: 5,
      comment: "Amazing selection of electronics! Fast shipping and great customer service.",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "Rajesh Kumar",
      rating: 5,
      comment: "Best prices I've found online. Quality products and excellent warranty coverage.",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "Anjali Patel",
      rating: 5,
      comment: "Love the tech support! They helped me choose the perfect laptop for my needs.",
      avatar: "https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?w=60&h=60&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section position-relative overflow-hidden">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="container">
                <div className="row min-vh-100 align-items-center">
                  <div className="col-lg-6 text-white">
                    <h1 className="display-3 fw-bold mb-4">{slide.title}</h1>
                    <p className="lead mb-4">{slide.subtitle}</p>
                    <Link to={slide.link} className="btn btn-warning btn-lg px-4">
                      {slide.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Hero Navigation Dots */}
        <div className="hero-dots position-absolute bottom-0 start-50 translate-middle-x mb-4">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Shop by Category</h2>
            <p className="lead text-muted">Find exactly what you're looking for</p>
          </div>
                     <div className="row g-4">
             {categories.map((category, index) => (
               <div key={index} className="col-md-4 col-lg-2">
                 <div className="card border-0 shadow-sm h-100 text-center category-card">
                   <div className="card-body p-4">
                     <i className={`bi ${category.icon} text-warning fs-1 mb-3`}></i>
                     <h5 className="fw-bold text-dark mb-2">{category.name}</h5>
                     <p className="text-muted small mb-0">{category.count} Products</p>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Featured Products</h2>
            <p className="lead text-muted">Handpicked electronics for tech enthusiasts</p>
          </div>
          <div className="row g-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100 product-card">
                  <div className="position-relative">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge bg-danger">Sale</span>
                    </div>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h6 className="fw-bold mb-2">{product.name}</h6>
                                         <div className="mb-2">
                       <span className="text-warning fw-bold">₹{product.price}</span>
                       <span className="text-muted text-decoration-line-through ms-2">₹{product.originalPrice}</span>
                     </div>
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <div className="text-warning me-2">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`bi bi-star${i < Math.floor(product.rating) ? '-fill' : ''}`}></i>
                          ))}
                        </div>
                        <small className="text-muted">({product.reviews})</small>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <Link to={`/product/${product.id}`} className="btn btn-warning w-100">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/shop" className="btn btn-outline-warning btn-lg px-4">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Why Choose ElectroHub?</h2>
            <p className="lead text-muted">We're committed to providing the best shopping experience</p>
          </div>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="text-center">
                  <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                    <i className={`bi ${feature.icon} text-white fs-2`}></i>
                  </div>
                  <h5 className="fw-bold mb-3">{feature.title}</h5>
                  <p className="text-muted">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">What Our Customers Say</h2>
            <p className="lead text-muted">Real reviews from satisfied customers</p>
          </div>
          <div className="row g-4">
            {reviews.map((review, index) => (
              <div key={index} className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <div className="text-warning mb-3">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill"></i>
                      ))}
                    </div>
                    <p className="mb-4">"{review.comment}"</p>
                    <div className="d-flex align-items-center">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="rounded-circle me-3"
                        width="50"
                        height="50"
                        style={{objectFit: 'cover'}}
                      />
                      <div>
                        <h6 className="fw-bold mb-0">{review.name}</h6>
                        <small className="text-muted">Verified Customer</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-5 bg-warning">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="display-6 fw-bold text-white mb-3">Stay Updated</h2>
              <p className="lead text-white mb-4">
                Subscribe to our newsletter for the latest deals, tech news, and exclusive offers
              </p>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="input-group input-group-lg">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email address"
                    />
                    <button className="btn btn-dark" type="button">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default HomePage; 