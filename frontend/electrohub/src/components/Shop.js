import React, { useEffect, useState } from 'react';
import Carousel from './Carousel';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaShoppingCart, FaStar, FaEye, FaHeart } from 'react-icons/fa';
import './Shop.css';

const Shop = ({ onCartUpdate }) => {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [addedToCart, setAddedToCart] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('/api/products').then(res => res.json()),
      fetch('/api/banners').then(res => res.json())
    ])
      .then(([productsData, bannersData]) => {
        setProducts(productsData);
        setFilteredProducts(productsData);
        setBanners(bannersData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load data:', err);
        setLoading(false);
      });
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = existingCart.findIndex(p => p._id === product._id);

    if (index >= 0) {
      existingCart[index].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));

    // Show success animation
    setAddedToCart(product._id);
    setTimeout(() => setAddedToCart(null), 2000);

    // Notify parent (App) to update navbar count
    if (onCartUpdate) {
      onCartUpdate(existingCart.reduce((acc, item) => acc + item.quantity, 0));
    }
  };

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  const ProductCard = ({ product }) => (
    <div className="product-card">
      <div className="card h-100 border-0 shadow-sm hover-shadow">
        <div className="position-relative">
          <img
            src={product.image}
            className="card-img-top bg-white"
            alt={product.name}
            style={{
              height: '220px',
              objectFit: 'contain',
              padding: '15px',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
          <div className="position-absolute top-0 end-0 m-2">
            <button className="btn btn-sm btn-light rounded-circle shadow-sm">
              <FaHeart className="text-muted" />
            </button>
          </div>
          {product.category && (
            <div className="position-absolute top-0 start-0 m-2">
              <span className="badge bg-primary rounded-pill">
                {product.category}
              </span>
            </div>
          )}
        </div>
        
        <div className="card-body d-flex flex-column p-3">
          <div className="mb-2">
            <h6 className="card-title mb-1 fw-bold text-dark">
              <Link to={`/product/${product._id}`} className="text-decoration-none">
                {product.name}
              </Link>
            </h6>
            <div className="d-flex align-items-center mb-2">
              <div className="text-warning me-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={12} className={i < (product.rating || 4) ? 'text-warning' : 'text-muted'} />
                ))}
              </div>
              <small className="text-muted">({product.rating || 4}.0)</small>
            </div>
          </div>

          <p className="card-text text-muted small mb-3 flex-grow-1">
            {product.description?.slice(0, 80)}...
          </p>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="h5 text-success fw-bold mb-0">₹{product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <small className="text-muted text-decoration-line-through ms-2">
                  ₹{product.originalPrice}
                </small>
              )}
            </div>
            <div className="d-flex gap-1">
              <Link 
                to={`/product/${product._id}`}
                className="btn btn-outline-secondary btn-sm"
                title="View Details"
              >
                <FaEye size={12} />
              </Link>
              <button
                className={`btn btn-sm ${addedToCart === product._id ? 'btn-success' : 'btn-primary'}`}
                onClick={() => handleAddToCart(product)}
                disabled={addedToCart === product._id}
              >
                {addedToCart === product._id ? (
                  <>
                    <FaShoppingCart size={12} className="me-1" />
                    Added!
                  </>
                ) : (
                  <>
                    <FaShoppingCart size={12} className="me-1" />
                    Add
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductList = ({ product }) => (
    <div className="card border-0 shadow-sm mb-3">
      <div className="row g-0">
        <div className="col-md-3">
          <img
            src={product.image}
            className="img-fluid rounded-start"
            alt={product.name}
            style={{ height: '150px', objectFit: 'contain', padding: '10px' }}
          />
        </div>
        <div className="col-md-9">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h5 className="card-title">
                  <Link to={`/product/${product._id}`} className="text-decoration-none">
                    {product.name}
                  </Link>
                </h5>
                <p className="card-text text-muted small">{product.description}</p>
                <div className="d-flex align-items-center mb-2">
                  <div className="text-warning me-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={14} className={i < (product.rating || 4) ? 'text-warning' : 'text-muted'} />
                    ))}
                  </div>
                  <small className="text-muted">({product.rating || 4}.0)</small>
                </div>
              </div>
              <div className="col-md-3 text-center">
                <div className="h4 text-success fw-bold mb-0">₹{product.price}</div>
                {product.category && (
                  <span className="badge bg-primary rounded-pill">{product.category}</span>
                )}
              </div>
              <div className="col-md-3 text-end">
                <div className="d-flex gap-2 justify-content-end">
                  <Link to={`/product/${product._id}`} className="btn btn-outline-secondary btn-sm">
                    <FaEye size={12} />
                  </Link>
                  <button
                    className={`btn btn-sm ${addedToCart === product._id ? 'btn-success' : 'btn-primary'}`}
                    onClick={() => handleAddToCart(product)}
                    disabled={addedToCart === product._id}
                  >
                    {addedToCart === product._id ? 'Added!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <>
        <Carousel banners={banners} />
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading amazing products...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Carousel banners={banners} />

      <div className="container my-5">
        {/* Header Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="fw-bold text-dark mb-1">Electronics Store</h2>
                <p className="text-muted mb-0">Discover amazing electronic components and gadgets</p>
              </div>
              <div className="d-flex gap-2">
                <button
                  className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <i className="bi bi-grid-3x3-gap"></i>
                </button>
                <button
                  className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setViewMode('list')}
                >
                  <i className="bi bi-list"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="row mb-4">
          <div className="col-md-8 mb-3">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <FaSearch className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Filters */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  className={`btn btn-sm ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="row mb-3">
          <div className="col-12">
            <p className="text-muted mb-0">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <FaSearch size={48} className="text-muted" />
            </div>
            <h5 className="text-muted">No products found</h5>
            <p className="text-muted">Try adjusting your search or filter criteria</p>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'row g-4' : ''}>
            {filteredProducts.map((product, idx) => (
              <div key={product._id} className={viewMode === 'grid' ? 'col-12 col-sm-6 col-md-4 col-lg-3' : 'col-12'}>
                {viewMode === 'grid' ? <ProductCard product={product} /> : <ProductList product={product} />}
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Shop;
