const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  branch: String,
  description: String,
  category: String,
  image: {
    data: Buffer,
    contentType: String
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
