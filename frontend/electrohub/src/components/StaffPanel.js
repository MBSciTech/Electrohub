import React, { useState } from 'react';

const StaffPanel = () => {
  const [activeTab, setActiveTab] = useState('product');

  const [productForm, setProductForm] = useState({
    name: '', brand: '', price: '', description: '', category: '',
    rating: '', stock: '', specs: '', imageFile: null
  });

  const [bannerForm, setBannerForm] = useState({ name: '', imageFile: null });
  const [discountForm, setDiscountForm] = useState({ type: 'brand', value: '', discount: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [status, setStatus] = useState('');

  // =================== PRODUCT ===================
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
        if (res.ok) setProductForm({ name: '', brand: '', price: '', description: '', category: '', rating: '', stock: '', specs: '', imageFile: null });
      } catch {
        setStatus('❌ Server error.');
      }
    };
    reader.readAsDataURL(productForm.imageFile);
  };

  // =================== BANNER ===================
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

  // =================== DISCOUNT ===================
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

  // =================== SEARCH ===================
  const handleSearch = async () => {
    try {
      const res = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setSearchResult(data);
    } catch {
      setStatus('❌ Failed to search.');
    }
  };

  // =================== TAB RENDER ===================
  const renderTab = () => {
    switch (activeTab) {
      case 'product':
        return (
          <form onSubmit={handleProductSubmit} className="card p-4 shadow-sm">
            <h4>Add Product</h4>
            <input className="form-control mb-2" type="text" name="name" placeholder="Name" value={productForm.name} onChange={handleProductChange} required />
            <input className="form-control mb-2" type="text" name="brand" placeholder="Brand" value={productForm.brand} onChange={handleProductChange} required />
            <input className="form-control mb-2" type="text" name="category" placeholder="Category" value={productForm.category} onChange={handleProductChange} required />
            <input className="form-control mb-2" type="number" name="price" placeholder="Price (₹)" value={productForm.price} onChange={handleProductChange} required />
            <input className="form-control mb-2" type="number" step="0.1" name="rating" placeholder="Rating" value={productForm.rating} onChange={handleProductChange} required />
            <input className="form-control mb-2" type="number" name="stock" placeholder="Stock" value={productForm.stock} onChange={handleProductChange} required />
            <input className="form-control mb-2" type="text" name="specs" placeholder="Specifications (comma-separated)" value={productForm.specs} onChange={handleProductChange} required />
            <textarea className="form-control mb-2" name="description" placeholder="Description" value={productForm.description} onChange={handleProductChange} required />
            <input className="form-control mb-3" type="file" name="imageFile" accept="image/*" onChange={handleProductChange} required />
            <button className="btn btn-primary">Add Product</button>
          </form>
        );

      case 'banner':
        return (
          <form onSubmit={handleBannerSubmit} className="card p-4 shadow-sm">
            <h4>Upload Banner</h4>
            <input className="form-control mb-2" type="text" name="name" placeholder="Banner Name" value={bannerForm.name} onChange={handleBannerChange} required />
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
        {['product', 'banner', 'discount', 'search'].map(tab => (
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
