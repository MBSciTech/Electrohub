const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Product = require('./models/Product');
const Banner = require('./models/Banner');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

mongoose.connect('mongodb+srv://maharshibhattisro:TmMURbJBf7mLSnPh@users.o2fplbs.mongodb.net/electrohub?retryWrites=true&w=majority&appName=Users')
  .then(async () => {
    console.log('✅ MongoDB connected successfully');
    // Print all collections in the connected database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📦 Collections in DB:', collections.map(c => c.name));
  })
  .catch(err => console.error('❌ MongoDB connection failed:', err));

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists.' });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    res.status(200).json({ message: 'Login successful.', user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Add product (with image as base64)
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, branch, description, imageBase64, imageType } = req.body;
    const product = new Product({
      name,
      price,
      branch,
      description,
      image: {
        data: Buffer.from(imageBase64, 'base64'),
        contentType: imageType
      }
    });
    await product.save();
    res.status(201).json({ message: 'Product created successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Get all products (return image as base64 string)
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    const productsWithBase64 = products.map(p => ({
      _id: p._id,
      name: p.name,
      price: p.price,
      branch: p.branch,
      description: p.description,
      image: p.image.data ? `data:${p.image.contentType};base64,${p.image.data.toString('base64')}` : null
    }));
    res.json(productsWithBase64);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Get all banners (return image as base64 string)
app.get('/api/banners', async (req, res) => {
  try {
    const banners = await Banner.find();
    const bannersWithBase64 = banners.map(b => ({
      _id: b._id,
      name: b.name,
      image: b.image.data ? `data:${b.image.contentType};base64,${b.image.data.toString('base64')}` : null
    }));
    res.json(bannersWithBase64);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}); 