import React, { useState } from 'react';

const StaffPanel = () => {
  const [activeTab, setActiveTab] = useState('product');

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
    if (!productForm.imageFile) return setStatus('❌ Please select an image.');

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
        setStatus(res.ok ? '✅ Product added!' : '❌ Failed to add product.');
        if (res.ok) {
          setProductForm({ name: '', brand: '', price: '', description: '', category: '', rating: '', stock: '', specs: '', imageFile: null });
        }
      } catch {
        setStatus('❌ Server error.');
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
    if (!bannerForm.imageFile) return setStatus('❌ Please select a banner image.');

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
        setStatus(res.ok ? '✅ Banner uploaded!' : '❌ Failed to upload banner.');
        if (res.ok) setBannerForm({ name: '', imageFile: null });
      } catch {
        setStatus('❌ Server error.');
      }
    };
    reader.readAsDataURL(bannerForm.imageFile);
  };

  // ========== DISCOUNT ==========
  const handleDiscountSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/discounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discountForm)
      });
      setStatus(res.ok ? '✅ Discount applied!' : '❌ Failed to apply discount.');
    } catch {
      setStatus('❌ Server error.');
    }
  };

  // ========== COUPON ==========
  const handleCouponSubmit = async (e) => {
    e.preventDefault();
  
    const { name, discount, expiryDate, userName } = couponForm;
  
    // Frontend check for empty fields
    if (!name.trim() || discount === '' || !expiryDate || !userName.trim()) {
      return setStatus('❌ All fields are required.');
    }
  
    const parsedDiscount = parseFloat(discount);
    if (isNaN(parsedDiscount) || parsedDiscount <= 0 || parsedDiscount > 100) {
      return setStatus('❌ Discount must be a number between 1 and 100.');
    }
  
    // Format expiry date properly
    const formattedDate = new Date(expiryDate);
    if (isNaN(formattedDate.getTime())) {
      return setStatus('❌ Invalid expiry date.');
    }
  
    const payload = {
      name: name.trim(),
      discount: parsedDiscount,
      expiryDate: expiryDate, // Send the original date string from the input
      userEmail: userName.trim() // Changed from userName to userEmail to match backend
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
        return setStatus(`❌ ${data.error || data.message || 'Failed to create coupon.'}`);
      }
  
      setStatus(`✅ Coupon created! Code: ${data.code}`);
      setCouponForm({ name: '', discount: '', expiryDate: '', userName: '' });
    } catch (error) {
      console.error('Coupon creation error:', error);
      setStatus('❌ Server error.');
    }
  };
  
  // ========== SEARCH ==========
  const handleSearch = async () => {
    try {
      const res = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setSearchResult(data);
    } catch {
      setStatus('❌ Failed to search.');
    }
  };

  // ========== RENDER TABS ==========
  const renderTab = () => {
    switch (activeTab) {
      case 'product':
        return (
          <form onSubmit={handleProductSubmit} className="card p-4 shadow-sm">
            <h4>Add Product</h4>
            <input className="form-control mb-2" name="name" value={productForm.name} placeholder="Name" onChange={handleProductChange} required />
            <input className="form-control mb-2" name="brand" value={productForm.brand} placeholder="Brand" onChange={handleProductChange} required />
            <input className="form-control mb-2" name="category" value={productForm.category} placeholder="Category" onChange={handleProductChange} required />
            <input className="form-control mb-2" name="price" type="number" value={productForm.price} placeholder="Price" onChange={handleProductChange} required />
            <input className="form-control mb-2" name="rating" type="number" value={productForm.rating} placeholder="Rating" onChange={handleProductChange} required />
            <input className="form-control mb-2" name="stock" type="number" value={productForm.stock} placeholder="Stock" onChange={handleProductChange} required />
            <input className="form-control mb-2" name="specs" value={productForm.specs} placeholder="Specifications (comma-separated)" onChange={handleProductChange} required />
            <textarea className="form-control mb-2" name="description" value={productForm.description} placeholder="Description" onChange={handleProductChange} required />
            <input className="form-control mb-3" type="file" name="imageFile" accept="image/*" onChange={handleProductChange} required />
            <button className="btn btn-primary">Add Product</button>
          </form>
        );

      case 'banner':
        return (
          <form onSubmit={handleBannerSubmit} className="card p-4 shadow-sm">
            <h4>Upload Banner</h4>
            <input className="form-control mb-2" name="name" value={bannerForm.name} placeholder="Banner Name" onChange={handleBannerChange} required />
            <input className="form-control mb-3" type="file" name="imageFile" accept="image/*" onChange={handleBannerChange} required />
            <button className="btn btn-primary">Upload Banner</button>
          </form>
        );

      case 'discount':
        return (
          <form onSubmit={handleDiscountSubmit} className="card p-4 shadow-sm">
            <h4>Apply Discount</h4>
            <select className="form-select mb-2" name="type" value={discountForm.type} onChange={(e) => setDiscountForm({ ...discountForm, type: e.target.value })}>
              <option value="brand">Brand</option>
              <option value="category">Category</option>
            </select>
            <input className="form-control mb-2" placeholder={discountForm.type} value={discountForm.value} onChange={(e) => setDiscountForm({ ...discountForm, value: e.target.value })} required />
            <input className="form-control mb-3" type="number" placeholder="Discount (%)" value={discountForm.discount} onChange={(e) => setDiscountForm({ ...discountForm, discount: e.target.value })} required />
            <button className="btn btn-primary">Apply Discount</button>
          </form>
        );

      case 'coupon':
        return (
          <form onSubmit={handleCouponSubmit} className="card p-4 shadow-sm">
            <h4>Create Coupon</h4>
            <input className="form-control mb-2" name="name" value={couponForm.name} placeholder="Coupon Name" onChange={(e) => setCouponForm({ ...couponForm, name: e.target.value })} required />
            <input className="form-control mb-2" name="discount" type="number" min="1" max="100" value={couponForm.discount} placeholder="Discount (%)" onChange={(e) => setCouponForm({ ...couponForm, discount: e.target.value })} required />
            <input className="form-control mb-2" name="expiryDate" type="date" value={couponForm.expiryDate} onChange={(e) => setCouponForm({ ...couponForm, expiryDate: e.target.value })} required />
            <input className="form-control mb-3" name="userName" value={couponForm.userName} placeholder="User Email or Name" onChange={(e) => setCouponForm({ ...couponForm, userName: e.target.value })} required />
            <button className="btn btn-primary">Create Coupon</button>
          </form>
        );

      case 'search':
        return (
          <div className="card p-4 shadow-sm">
            <h4>Search Product</h4>
            <input className="form-control mb-3" placeholder="Enter product name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button className="btn btn-primary" onClick={handleSearch}>Search</button>
            {searchResult && (
              <div className="mt-3">
                <h5>Search Results:</h5>
                <pre>{JSON.stringify(searchResult, null, 2)}</pre>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">🛠 Staff Panel</h2>
      <ul className="nav nav-tabs mb-4">
        {['product', 'banner', 'discount', 'coupon', 'search'].map(tab => (
          <li className="nav-item" key={tab}>
            <button className={`nav-link${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      {renderTab()}
      {status && <div className="alert alert-info mt-4">{status}</div>}
    </div>
  );
};

export default StaffPanel;
