const mongoose = require('mongoose');
const Offer = require('./models/Offers');

// Connect to MongoDB
mongoose.connect('mongodb+srv://maharshibhattisro:TmMURbJBf7mLSnPh@users.o2fplbs.mongodb.net/electrohub?retryWrites=true&w=majority&appName=Users')
  .then(async () => {
    console.log('✅ MongoDB connected successfully');
    
    // Create test coupons
    const testCoupons = [
      {
        name: 'Welcome Discount',
        discount: 10,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        userEmail: 'test@example.com',
        code: 'WELCOME10',
        isUsed: false
      },
      {
        name: 'Summer Sale',
        discount: 15,
        expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
        userEmail: 'test@example.com',
        code: 'SUMMER15',
        isUsed: false
      },
      {
        name: 'First Purchase',
        discount: 20,
        expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
        userEmail: 'test@example.com',
        code: 'FIRST20',
        isUsed: false
      }
    ];

    try {
      // Clear existing test coupons
      await Offer.deleteMany({ userEmail: 'test@example.com' });
      console.log('🗑️ Cleared existing test coupons');

      // Insert new test coupons
      const result = await Offer.insertMany(testCoupons);
      console.log('✅ Created test coupons:', result.length);
      
      // Display created coupons
      result.forEach(coupon => {
        console.log(`- ${coupon.name}: ${coupon.code} (${coupon.discount}% off)`);
      });

      console.log('\n📧 Test user email: test@example.com');
      console.log('🔑 Test coupon codes: WELCOME10, SUMMER15, FIRST20');
      
    } catch (err) {
      console.error('❌ Error creating test coupons:', err);
    }
    
    mongoose.connection.close();
  })
  .catch(err => console.error('❌ MongoDB connection failed:', err)); 