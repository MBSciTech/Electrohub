const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb+srv://maharshibhattisro:TmMURbJBf7mLSnPh@users.o2fplbs.mongodb.net/electrohub?retryWrites=true&w=majority&appName=Users')
  .then(async () => {
    console.log("✅ MongoDB connected successfully");

    // Create new user
    const newUser = new User({
      name: "John Doe",
      email: "john@example.com",
      password: "secure123"
    });

    await newUser.save(); // Save user to database
    console.log("✅ User added:", newUser);

    mongoose.disconnect(); // Close DB connection
  })
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err);
  });
