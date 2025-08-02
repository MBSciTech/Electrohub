import React, { useState, useEffect } from 'react';

const StaffPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeCoupons: 0
  });

  const [productForm, setProductForm] = useState({
    name: '', brand: '', price: '', description: '', category: '',
    rating: '', stock: '', specs: '', imageFile: null
  });

  const [bannerForm, setBannerForm] = useState({ name: '', imageFile: null });
  const [discountForm, setDiscountForm] = useState({ type: 'brand', value: '', discount: '' });
  const [couponForm, setCouponForm] = useState({
    name: '', discount: '', expiryDate: '', userName: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Fetch dashboard stats
  useEffect(() => {
    fetchStats();
  }, []);

  // Fetch orders when orders tab is active
  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const [productsRes, ordersRes, couponsRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders'),
        fetch('/api/coupons')
      ]);
      
      const products = await productsRes.json();
      const orders = await ordersRes.json();
      const coupons = await couponsRes.json();
      
      const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
      const activeCoupons = coupons.filter(coupon => new Date(coupon.expiryDate) > new Date()).length;
      
      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue: totalRevenue,
        activeCoupons: activeCoupons
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      // Set default values if API calls fail
      setStats({
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        activeCoupons: 0
      });
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const ordersData = await response.json();
        setOrders(ordersData);
      } else {
        console.error('Failed to fetch orders');
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    }
  };

  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        setStatus('✅ Order status updated successfully!');
        fetchOrders(); // Refresh orders
      } else {
        setStatus('❌ Failed to update order status.');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      setStatus('❌ Server error occurred.');
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  // ========== PRODUCT ==========
  const handleProductChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setProductForm({ ...productForm, imageFile: files[0] });
    } else {
      setProductForm({ ...productForm, [name]: value });
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!productForm.imageFile) {
      setStatus('❌ Please select an image.');
      setLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const payload = {
        ...productForm,
        rating: parseFloat(productForm.rating),
        stock: parseInt(productForm.stock),
        specs: productForm.specs.split(',').map(s => s.trim()),
        imageBase64: reader.result.split(',')[1],
        imageType: productForm.imageFile.type
      };

      try {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        setStatus(res.ok ? '✅ Product added successfully!' : '❌ Failed to add product.');
        if (res.ok) {
          setProductForm({ name: '', brand: '', price: '', description: '', category: '', rating: '', stock: '', specs: '', imageFile: null });
          fetchStats();
        }
      } catch {
        setStatus('❌ Server error occurred.');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(productForm.imageFile);
  };

  // ========== BANNER ==========
  const handleBannerChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setBannerForm({ ...bannerForm, imageFile: files[0] });
    } else {
      setBannerForm({ ...bannerForm, [name]: value });
    }
  };

  const handleBannerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!bannerForm.imageFile) {
      setStatus('❌ Please select a banner image.');
      setLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const payload = {
        name: bannerForm.name,
        imageBase64: reader.result.split(',')[1],
        imageType: bannerForm.imageFile.type
      };

      try {
        const res = await fetch('/api/banners', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        setStatus(res.ok ? '✅ Banner uploaded successfully!' : '❌ Failed to upload banner.');
        if (res.ok) setBannerForm({ name: '', imageFile: null });
      } catch {
        setStatus('❌ Server error occurred.');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(bannerForm.imageFile);
  };

  // ========== DISCOUNT ==========
  const handleDiscountSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Validation
    if (!discountForm.value.trim() || !discountForm.discount) {
      setStatus('❌ Please fill in all fields.');
      setLoading(false);
      return;
    }

    const discountValue = parseFloat(discountForm.discount);
    if (isNaN(discountValue) || discountValue <= 0 || discountValue > 100) {
      setStatus('❌ Discount must be a number between 1 and 100.');
      setLoading(false);
      return;
    }
    
    try {
      const res = await fetch('/api/discounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: discountForm.type,
          value: discountForm.value.trim(),
          discount: discountValue
        })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setStatus(`✅ Discount applied successfully! ${data.message}`);
        setDiscountForm({ type: 'brand', value: '', discount: '' });
      } else {
        setStatus(`❌ ${data.error || 'Failed to apply discount.'}`);
      }
    } catch (error) {
      console.error('Discount error:', error);
      setStatus('❌ Server error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // ========== COUPON ==========
  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const { name, discount, expiryDate, userName } = couponForm;
  
    if (!name.trim() || discount === '' || !expiryDate || !userName.trim()) {
      setStatus('❌ All fields are required.');
      setLoading(false);
      return;
    }
  
    const parsedDiscount = parseFloat(discount);
    if (isNaN(parsedDiscount) || parsedDiscount <= 0 || parsedDiscount > 100) {
      setStatus('❌ Discount must be a number between 1 and 100.');
      setLoading(false);
      return;
    }
  
    const formattedDate = new Date(expiryDate);
    if (isNaN(formattedDate.getTime())) {
      setStatus('❌ Invalid expiry date.');
      setLoading(false);
      return;
    }
  
    const payload = {
      name: name.trim(),
      discount: parsedDiscount,
      expiryDate: expiryDate,
      userEmail: userName.trim()
    };
  
    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        console.error('Coupon creation failed:', data);
        setStatus(`❌ ${data.error || data.message || 'Failed to create coupon.'}`);
      } else {
        setStatus(`✅ Coupon created successfully! Code: ${data.code}`);
        setCouponForm({ name: '', discount: '', expiryDate: '', userName: '' });
        fetchStats();
      }
    } catch (error) {
      console.error('Coupon creation error:', error);
      setStatus('❌ Server error occurred.');
    } finally {
      setLoading(false);
    }
  };
  
  // ========== SEARCH ==========
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setStatus('❌ Please enter a search query.');
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}`);
      
      if (!res.ok) {
        const errorData = await res.json();
        setStatus(`❌ ${errorData.error || 'Failed to search products.'}`);
        setSearchResult([]);
        return;
      }
      
      const data = await res.json();
      setSearchResult(data);
      setStatus(data.length > 0 ? `✅ Found ${data.length} product(s)` : '❌ No products found');
    } catch (error) {
      console.error('Search error:', error);
      setStatus('❌ Failed to search products. Please try again.');
      setSearchResult([]);
    } finally {
      setLoading(false);
    }
  };

  // ========== RENDER DASHBOARD ==========
  const renderDashboard = () => (
    <div className="row g-4">
      {/* Stats Cards */}
      <div className="col-md-3">
        <div className="card bg-primary text-white h-100">
          <div className="card-body text-center">
            <i className="bi bi-box-seam fs-1 mb-2"></i>
            <h5 className="card-title">Total Products</h5>
            <h3 className="mb-0">{stats.totalProducts}</h3>
          </div>
        </div>
      </div>
      
      <div className="col-md-3">
        <div className="card bg-success text-white h-100">
          <div className="card-body text-center">
            <i className="bi bi-cart-check fs-1 mb-2"></i>
            <h5 className="card-title">Total Orders</h5>
            <h3 className="mb-0">{stats.totalOrders}</h3>
          </div>
        </div>
      </div>
      
      <div className="col-md-3">
        <div className="card bg-warning text-dark h-100">
          <div className="card-body text-center">
            <i className="bi bi-currency-dollar fs-1 mb-2"></i>
            <h5 className="card-title">Revenue</h5>
            <h3 className="mb-0">₹{stats.totalRevenue.toFixed(2)}</h3>
          </div>
        </div>
      </div>
      
      <div className="col-md-3">
        <div className="card bg-info text-white h-100">
          <div className="card-body text-center">
            <i className="bi bi-ticket-perforated fs-1 mb-2"></i>
            <h5 className="card-title">Active Coupons</h5>
            <h3 className="mb-0">{stats.activeCoupons}</h3>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">
              <i className="bi bi-lightning me-2"></i>
              Quick Actions
            </h5>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <button 
                  className="btn btn-outline-primary w-100" 
                  onClick={() => setActiveTab('product')}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Add Product
                </button>
              </div>
              <div className="col-md-3">
                <button 
                  className="btn btn-outline-success w-100" 
                  onClick={() => setActiveTab('banner')}
                >
                  <i className="bi bi-image me-2"></i>
                  Upload Banner
                </button>
              </div>
              <div className="col-md-3">
                <button 
                  className="btn btn-outline-warning w-100" 
                  onClick={() => setActiveTab('coupon')}
                >
                  <i className="bi bi-ticket me-2"></i>
                  Create Coupon
                </button>
              </div>
              <div className="col-md-3">
                <button 
                  className="btn btn-outline-info w-100" 
                  onClick={() => setActiveTab('search')}
                >
                  <i className="bi bi-search me-2"></i>
                  Search Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ========== RENDER TABS ==========
  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();

      case 'product':
        return (
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-plus-circle me-2"></i>
                Add New Product
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleProductSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Product Name *</label>
                    <input 
                      className="form-control" 
                      name="name" 
                      value={productForm.name} 
                      placeholder="Enter product name" 
                      onChange={handleProductChange} 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Brand *</label>
                    <input 
                      className="form-control" 
                      name="brand" 
                      value={productForm.brand} 
                      placeholder="Enter brand name" 
                      onChange={handleProductChange} 
                      required 
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Category *</label>
                    <select 
                      className="form-select" 
                      name="category" 
                      value={productForm.category} 
                      onChange={handleProductChange} 
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Computers">Computers</option>
                      <option value="Laptop">Laptop</option>
                      <option value="Phone">Phone</option>
                      <option value="Mouse">Mouse</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Gaming">Gaming</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Price (₹) *</label>
                    <input 
                      className="form-control" 
                      name="price" 
                      type="number" 
                      value={productForm.price} 
                      placeholder="Enter price" 
                      onChange={handleProductChange} 
                      required 
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Stock Quantity *</label>
                    <input 
                      className="form-control" 
                      name="stock" 
                      type="number" 
                      value={productForm.stock} 
                      placeholder="Enter stock quantity" 
                      onChange={handleProductChange} 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Rating (1-5) *</label>
                    <input 
                      className="form-control" 
                      name="rating" 
                      type="number" 
                      min="1" 
                      max="5" 
                      step="0.1"
                      value={productForm.rating} 
                      placeholder="Enter rating" 
                      onChange={handleProductChange} 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Product Image *</label>
                    <input 
                      className="form-control" 
                      type="file" 
                      name="imageFile" 
                      accept="image/*" 
                      onChange={handleProductChange} 
                      required 
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Specifications (comma-separated) *</label>
                    <input 
                      className="form-control" 
                      name="specs" 
                      value={productForm.specs} 
                      placeholder="e.g., RAM: 8GB, Storage: 256GB, Color: Black" 
                      onChange={handleProductChange} 
                      required 
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Description *</label>
                    <textarea 
                      className="form-control" 
                      name="description" 
                      value={productForm.description} 
                      placeholder="Enter detailed product description" 
                      onChange={handleProductChange} 
                      rows="4"
                      required 
                    />
                  </div>
                  <div className="col-12">
                    <button 
                      className="btn btn-primary" 
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Adding Product...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-plus-circle me-2"></i>
                          Add Product
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );

      case 'banner':
        return (
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">
                <i className="bi bi-image me-2"></i>
                Upload Banner
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleBannerSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Banner Name *</label>
                    <input 
                      className="form-control" 
                      name="name" 
                      value={bannerForm.name} 
                      placeholder="Enter banner name" 
                      onChange={handleBannerChange} 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Banner Image *</label>
                    <input 
                      className="form-control" 
                      type="file" 
                      name="imageFile" 
                      accept="image/*" 
                      onChange={handleBannerChange} 
                      required 
                    />
                  </div>
                  <div className="col-12">
                    <button 
                      className="btn btn-success" 
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-upload me-2"></i>
                          Upload Banner
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );

      case 'discount':
        return (
          <div className="card shadow-sm">
            <div className="card-header bg-warning text-dark">
              <h5 className="mb-0">
                <i className="bi bi-percent me-2"></i>
                Apply Discount
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleDiscountSubmit}>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Discount Type *</label>
                    <select 
                      className="form-select" 
                      name="type" 
                      value={discountForm.type} 
                      onChange={(e) => setDiscountForm({ ...discountForm, type: e.target.value })}
                    >
                      <option value="brand">Brand</option>
                      <option value="category">Category</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">{discountForm.type.charAt(0).toUpperCase() + discountForm.type.slice(1)} *</label>
                    <input 
                      className="form-control" 
                      placeholder={`Enter ${discountForm.type}`} 
                      value={discountForm.value} 
                      onChange={(e) => setDiscountForm({ ...discountForm, value: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Discount (%) *</label>
                    <input 
                      className="form-control" 
                      type="number" 
                      min="1" 
                      max="100"
                      placeholder="Enter discount percentage" 
                      value={discountForm.discount} 
                      onChange={(e) => setDiscountForm({ ...discountForm, discount: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="col-12">
                    <button 
                      className="btn btn-warning" 
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Applying...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-circle me-2"></i>
                          Apply Discount
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );

      case 'coupon':
        return (
          <div className="card shadow-sm">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">
                <i className="bi bi-ticket-perforated me-2"></i>
                Create Coupon
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleCouponSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Coupon Name *</label>
                    <input 
                      className="form-control" 
                      name="name" 
                      value={couponForm.name} 
                      placeholder="Enter coupon name" 
                      onChange={(e) => setCouponForm({ ...couponForm, name: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Discount (%) *</label>
                    <input 
                      className="form-control" 
                      name="discount" 
                      type="number" 
                      min="1" 
                      max="100" 
                      value={couponForm.discount} 
                      placeholder="Enter discount percentage" 
                      onChange={(e) => setCouponForm({ ...couponForm, discount: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Expiry Date *</label>
                    <input 
                      className="form-control" 
                      name="expiryDate" 
                      type="date" 
                      value={couponForm.expiryDate} 
                      onChange={(e) => setCouponForm({ ...couponForm, expiryDate: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">User Email *</label>
                    <input 
                      className="form-control" 
                      name="userName" 
                      type="email"
                      value={couponForm.userName} 
                      placeholder="Enter user email" 
                      onChange={(e) => setCouponForm({ ...couponForm, userName: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="col-12">
                    <button 
                      className="btn btn-info" 
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Creating...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-plus-circle me-2"></i>
                          Create Coupon
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );

              case 'orders':
          return (
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className="bi bi-cart-check me-2"></i>
                  Manage Orders
                </h5>
              </div>
              <div className="card-body">
                {orders.length === 0 ? (
                  <div className="text-center py-4">
                    <i className="bi bi-cart-x fs-1 text-muted mb-3"></i>
                    <h5 className="text-muted">No Orders Found</h5>
                    <p className="text-muted">Orders will appear here once customers place them.</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order._id}>
                            <td>
                              <strong>{order.id}</strong>
                            </td>
                            <td>
                              <div>
                                <strong>{order.userName}</strong><br />
                                <small className="text-muted">{order.userEmail}</small>
                              </div>
                            </td>
                            <td>
                              <small>
                                {order.items.length} item(s)<br />
                                <span className="text-muted">
                                  {order.items.map(item => item.name).join(', ')}
                                </span>
                              </small>
                            </td>
                            <td>
                              <strong>₹{order.total.toFixed(2)}</strong>
                              {order.discount > 0 && (
                                <>
                                  <br />
                                  <small className="text-success">
                                    {order.discount}% off
                                  </small>
                                </>
                              )}
                            </td>
                            <td>
                              <span className={`badge ${
                                order.status === 'Processing' ? 'bg-warning' :
                                order.status === 'Shipped' ? 'bg-info' :
                                order.status === 'Delivered' ? 'bg-success' :
                                'bg-danger'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td>
                              <small>
                                {new Date(order.orderDate).toLocaleDateString()}<br />
                                <span className="text-muted">
                                  {new Date(order.orderDate).toLocaleTimeString()}
                                </span>
                              </small>
                            </td>
                            <td>
                              <button 
                                className="btn btn-sm btn-outline-primary me-1"
                                title="View Details"
                                onClick={() => handleViewOrder(order)}
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                              <div className="btn-group" role="group">
                                <button 
                                  className="btn btn-sm btn-outline-success"
                                  title="Update Status"
                                  onClick={() => handleOrderStatusUpdate(order.id, 'Processing')}
                                >
                                  Process
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-info"
                                  title="Mark Shipped"
                                  onClick={() => handleOrderStatusUpdate(order.id, 'Shipped')}
                                >
                                  Ship
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-success"
                                  title="Mark Delivered"
                                  onClick={() => handleOrderStatusUpdate(order.id, 'Delivered')}
                                >
                                  Deliver
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          );

        case 'search':
          return (
            <div className="card shadow-sm">
              <div className="card-header bg-secondary text-white">
                <h5 className="mb-0">
                  <i className="bi bi-search me-2"></i>
                  Search Products
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-8">
                    <label className="form-label">Search Query</label>
                    <input 
                      className="form-control" 
                      placeholder="Enter product name, brand, or category" 
                      value={searchQuery} 
                      onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">&nbsp;</label>
                    <button 
                      className="btn btn-secondary w-100" 
                      onClick={handleSearch}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Searching...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-search me-2"></i>
                          Search
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                {searchResult && searchResult.length > 0 && (
                  <div className="mt-4">
                    <h6>Search Results ({searchResult.length} found):</h6>
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchResult.map((product, index) => (
                            <tr key={index}>
                              <td>
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                                />
                              </td>
                              <td>{product.name}</td>
                              <td>{product.brand}</td>
                              <td>{product.category}</td>
                              <td>₹{product.price}</td>
                              <td>{product.stock}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );

      default:
        return null;
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">
            <i className="bi bi-gear-fill text-primary me-2"></i>
            Staff Panel
          </h2>
          <p className="text-muted mb-0">Manage products, banners, discounts, and more</p>
        </div>
        <div className="text-end">
          <small className="text-muted">Last updated: {new Date().toLocaleString()}</small>
        </div>
      </div>

      {/* Navigation Tabs */}
      <ul className="nav nav-tabs mb-4">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
          { id: 'product', label: 'Products', icon: 'bi-box-seam' },
          { id: 'banner', label: 'Banners', icon: 'bi-image' },
          { id: 'discount', label: 'Discounts', icon: 'bi-percent' },
          { id: 'coupon', label: 'Coupons', icon: 'bi-ticket-perforated' },
          { id: 'orders', label: 'Orders', icon: 'bi-cart-check' },
          { id: 'search', label: 'Search', icon: 'bi-search' }
        ].map(tab => (
          <li className="nav-item" key={tab.id}>
            <button 
              className={`nav-link${activeTab === tab.id ? ' active' : ''}`} 
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={`${tab.icon} me-1`}></i>
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {renderTab()}
      
      {status && (
        <div className={`alert ${status.includes('✅') ? 'alert-success' : status.includes('❌') ? 'alert-danger' : 'alert-info'} mt-4`}>
          <i className={`bi ${status.includes('✅') ? 'bi-check-circle' : status.includes('❌') ? 'bi-exclamation-triangle' : 'bi-info-circle'} me-2`}></i>
          {status}
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-cart-check me-2"></i>
                  Order Details - {selectedOrder.id}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowOrderModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Customer Information</h6>
                    <p><strong>Name:</strong> {selectedOrder.userName}</p>
                    <p><strong>Email:</strong> {selectedOrder.userEmail}</p>
                    <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
                    <p><strong>Status:</strong> 
                      <span className={`badge ms-2 ${
                        selectedOrder.status === 'Processing' ? 'bg-warning' :
                        selectedOrder.status === 'Shipped' ? 'bg-info' :
                        selectedOrder.status === 'Delivered' ? 'bg-success' :
                        'bg-danger'
                      }`}>
                        {selectedOrder.status}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h6>Shipping Information</h6>
                    <p><strong>Address:</strong></p>
                    <p className="text-muted">{selectedOrder.shippingAddress}</p>
                    <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                  </div>
                </div>
                
                <hr />
                
                <h6>Order Items</h6>
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>₹{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3" className="text-end"><strong>Subtotal:</strong></td>
                        <td>₹{(selectedOrder.total / (1 - selectedOrder.discount / 100)).toFixed(2)}</td>
                      </tr>
                      {selectedOrder.discount > 0 && (
                        <tr>
                          <td colSpan="3" className="text-end"><strong>Discount ({selectedOrder.discount}%):</strong></td>
                          <td className="text-success">-₹{((selectedOrder.total / (1 - selectedOrder.discount / 100)) * selectedOrder.discount / 100).toFixed(2)}</td>
                        </tr>
                      )}
                      <tr>
                        <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                        <td><strong>₹{selectedOrder.total.toFixed(2)}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowOrderModal(false)}
                >
                  Close
                </button>
                <div className="btn-group">
                  <button 
                    type="button" 
                    className="btn btn-warning"
                    onClick={() => {
                      handleOrderStatusUpdate(selectedOrder.id, 'Processing');
                      setShowOrderModal(false);
                    }}
                  >
                    Mark Processing
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-info"
                    onClick={() => {
                      handleOrderStatusUpdate(selectedOrder.id, 'Shipped');
                      setShowOrderModal(false);
                    }}
                  >
                    Mark Shipped
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-success"
                    onClick={() => {
                      handleOrderStatusUpdate(selectedOrder.id, 'Delivered');
                      setShowOrderModal(false);
                    }}
                  >
                    Mark Delivered
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </div>
  );
};

export default StaffPanel;
