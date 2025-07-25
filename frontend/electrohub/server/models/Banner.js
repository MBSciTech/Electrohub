const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  name: String,
  image: {
    data: Buffer,
    contentType: String
  }
});

const Banner = mongoose.model('Banner', bannerSchema);
module.exports = Banner; 