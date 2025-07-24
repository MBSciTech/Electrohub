const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Banner = require('./models/Banner');

// Connect to MongoDB
mongoose.connect('mongodb+srv://maharshibhattisro:TmMURbJBf7mLSnPh@users.o2fplbs.mongodb.net/electrohub?retryWrites=true&w=majority&appName=Users')
  .then(async () => {
    console.log('✅ MongoDB connected successfully');

    // Path to your banners
    const bannersDir = path.join(__dirname, '../public/images/banners');
    const files = fs.readdirSync(bannersDir);

    for (const file of files) {
      const filePath = path.join(bannersDir, file);
      const data = fs.readFileSync(filePath);
      // Guess content type from extension
      let ext = path.extname(file).replace('.', '').toLowerCase();
      let contentType = 'image/' + (ext === 'jpg' ? 'jpeg' : ext);
      const banner = new Banner({
        name: file,
        image: {
          data,
          contentType
        }
      });
      await banner.save();
      console.log(`✅ Uploaded: ${file}`);
    }

    mongoose.disconnect();
    console.log('✅ All banners uploaded and DB connection closed.');
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err);
  }); 