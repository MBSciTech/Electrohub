import React, { useState } from 'react';

const StaffPanel = () => {
  const [form, setForm] = useState({
    name: '',
    brand: '',
    price: '',
    description: '',
    category: '',
    imageFile: null,
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setForm({ ...form, imageFile: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.imageFile) {
      setStatus('Please select an image.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result.split(',')[1];
      const imageType = form.imageFile.type;
      const payload = {
        name: form.name,
        brand: form.brand,
        price: form.price,
        description: form.description,
        category: form.category,
        imageBase64: base64String,
        imageType,
      };
      try {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setStatus('Product added successfully!');
          setForm({
            name: '',
            brand: '',
            price: '',
            description: '',
            category: '',
            imageFile: null,
          });
        } else {
          setStatus('Failed to add product.');
        }
      } catch (err) {
        setStatus('Server error.');
      }
    };
    reader.readAsDataURL(form.imageFile);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Staff Panel: Add Product</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input type="text" className="form-control" name="brand" value={form.brand} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input type="text" className="form-control" name="category" value={form.category} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="text" className="form-control" name="price" value={form.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" value={form.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input type="file" className="form-control" name="imageFile" accept="image/*" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
        {status && <div className="mt-3 alert alert-info">{status}</div>}
      </form>
    </div>
  );
};

export default StaffPanel;
