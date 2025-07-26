const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://maharshibhattisro:TmMURbJBf7mLSnPh@users.o2fplbs.mongodb.net/electrohub?retryWrites=true&w=majority&appName=Users';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('✅ MongoDB connected');

    try {
      const result = await mongoose.connection.db.collection('products').updateMany(
        {},
        { $rename: { 'branch': 'brand' } }
      );

      console.log(`✅ Renamed 'branch' to 'brand' in ${result.modifiedCount} documents.`);
    } catch (err) {
      console.error('❌ Rename error:', err);
    } finally {
      mongoose.disconnect();
    }
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });
