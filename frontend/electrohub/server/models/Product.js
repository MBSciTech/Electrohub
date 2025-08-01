const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  brand: String,
  description: String,
  category: String,
  image: {
    data: Buffer,
    contentType: String
  },
  rating: {
    type: Number,
    default: 4.2
  },
  specs: {
    type: [String],
    default: ["Battery: 5000mAh", "Display: 6.5-inch", "Processor: Snapdragon 888"]
  },
  stock: {
    type: Number,
    default: 25
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
