const mongoose = require('mongoose');
const Product = require('./models/Product');

// Connect to your MongoDB
mongoose.connect('mongodb+srv://maharshibhattisro:TmMURbJBf7mLSnPh@users.o2fplbs.mongodb.net/electrohub?retryWrites=true&w=majority&appName=Users', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  addFieldsToProducts();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const addFieldsToProducts = async () => {
  try {
    const products = await Product.find();

    for (let product of products) {
      product.rating = product.rating || 4.2;
      product.specs = product.specs || ["Battery: 5000mAh", "Display: 6.5-inch", "Processor: Snapdragon 888"]; 
      product.stock = product.stock || 25;

      await product.save();
      console.log(`Updated product: ${product.name}`);
    }

    console.log("All products updated successfully.");
    mongoose.disconnect();
  } catch (err) {
    console.error('Error updating products:', err);
    mongoose.disconnect();
  }
};
