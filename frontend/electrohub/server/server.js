const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Product = require('./models/Product');
const Banner = require('./models/Banner');
const Offer = require('./models/Offers');
const Order = require('./models/Order');


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
    const {
      name,
      price,
      brand,
      description,
      category,
      rating,
      stock,
      specs,
      imageBase64,
      imageType
    } = req.body;

    const product = new Product({
      name,
      price,
      brand,
      description,
      category,
      rating,
      stock,
      specs,
      image: {
        data: Buffer.from(imageBase64, 'base64'),
        contentType: imageType
      }
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully.' });
  } catch (err) {
    console.error(err);
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
      brand: p.brand,
      description: p.description,
      image: p.image.data ? `data:${p.image.contentType};base64,${p.image.data.toString('base64')}` : null
    }));
    res.json(productsWithBase64);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}); 

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const productWithBase64 = {
      _id: product._id,
      name: product.name,
      price: product.price,
      brand: product.brand,
      description: product.description,
      category: product.category,
      rating: product.rating,
      stock: product.stock,
      specs: product.specs,
      image: product.image?.data
        ? `data:${product.image.contentType};base64,${product.image.data.toString('base64')}`
        : null
    };

    res.json(productWithBase64);
  } catch (err) {
    console.error('❌ Failed to fetch product by ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Apply discount to brand or category
app.post('/api/discounts', async (req, res) => {
  const { type, value, discount } = req.body;

  if (!['brand', 'category'].includes(type) || !value || !discount) {
    return res.status(400).json({ error: 'Invalid discount data.' });
  }

  try {
    const filter = { [type]: value };
    const update = { $set: { discount: parseFloat(discount) } };

    const result = await Product.updateMany(filter, update);
    res.status(200).json({ message: `Discount applied to ${result.modifiedCount} product(s).` });
  } catch (err) {
    console.error('❌ Discount error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Search products by name
app.get('/api/products/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Missing query.' });

  try {
    const results = await Product.find({
      name: { $regex: query, $options: 'i' }
    });

    const formatted = results.map(p => ({
      _id: p._id,
      name: p.name,
      price: p.price,
      brand: p.brand,
      category: p.category,
      image: p.image?.data
        ? `data:${p.image.contentType};base64,${p.image.data.toString('base64')}`
        : null
    }));

    res.json(formatted);
  } catch (err) {
    console.error('❌ Search error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all banners (GET /api/banners)
app.get('/api/banners', async (req, res) => {
  try {
    const banners = await Banner.find();

    const bannersWithBase64 = banners.map(b => ({
      _id: b._id,
      name: b.name,
      image: b.image?.data
        ? `data:${b.image.contentType};base64,${b.image.data.toString('base64')}`
        : null
    }));

    res.json(bannersWithBase64);
  } catch (err) {
    console.error('❌ Error fetching banners:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Upload a banner (POST /api/banners)
app.post('/api/banners', async (req, res) => {
  try {
    const { name, imageBase64, imageType } = req.body;

    if (!name || !imageBase64 || !imageType) {
      return res.status(400).json({ error: 'Name and image are required.' });
    }

    const banner = new Banner({
      name,
      image: {
        data: Buffer.from(imageBase64, 'base64'),
        contentType: imageType
      }
    });

    await banner.save();
    res.status(201).json({ message: 'Banner uploaded successfully.' });
  } catch (err) {
    console.error('❌ Error uploading banner:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// GET /api/coupons - Get all coupons (for staff panel)
app.get('/api/coupons', async (req, res) => {
  try {
    const coupons = await Offer.find().sort({ expiryDate: -1 });
    res.json(coupons);
  } catch (err) {
    console.error('❌ Error fetching coupons:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/coupons
app.post('/api/coupons', async (req, res) => {
  try {
    const { name, discount, expiryDate, userEmail } = req.body;

    if (!name || !discount || !expiryDate || !userEmail) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const code = name.slice(0, 3).toUpperCase() + Math.floor(100 + Math.random() * 900);

    const offer = new Offer({
      name,
      discount: parseFloat(discount),
      expiryDate: new Date(expiryDate),
      userEmail,
      code,
      isUsed: false
    });

    await offer.save();
    res.status(201).json({ message: 'Coupon created', code });
  } catch (err) {
    res.status(500).json({ error: 'Error creating coupon' });
  }
});

// GET /api/users/:email/coupons
app.get('/api/users/:email/coupons', async (req, res) => {
  try {
    const { email } = req.params;
    const coupons = await Offer.find({
      userEmail: email,
      isUsed: false,
      expiryDate: { $gte: new Date() }
    });
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch coupons' });
  }
});

// GET /api/orders - Get all orders (for staff panel)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json(orders);
  } catch (err) {
    console.error('❌ Error fetching orders:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/orders - Create new order
app.post('/api/orders', async (req, res) => {
  try {
    const {
      userEmail,
      userName,
      items,
      total,
      discount,
      shippingAddress,
      paymentMethod
    } = req.body;

    // Generate unique order ID
    const orderId = 'ORD' + Date.now() + Math.floor(Math.random() * 1000);

    const order = new Order({
      id: orderId,
      userEmail,
      userName,
      items,
      total,
      discount: discount || 0,
      shippingAddress,
      paymentMethod: paymentMethod || 'Credit Card'
    });

    await order.save();
    res.status(201).json({ message: 'Order created successfully', orderId });
  } catch (err) {
    console.error('❌ Error creating order:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/orders/:userEmail - Get orders for specific user
app.get('/api/orders/:userEmail', async (req, res) => {
  try {
    const { userEmail } = req.params;
    const orders = await Order.find({ userEmail }).sort({ orderDate: -1 });
    res.json(orders);
  } catch (err) {
    console.error('❌ Error fetching user orders:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/orders/:orderId/status - Update order status
app.put('/api/orders/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findOneAndUpdate(
      { id: orderId },
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order status updated successfully', order });
  } catch (err) {
    console.error('❌ Error updating order status:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
