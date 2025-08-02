const mongoose = require('mongoose');
const Order = require('./models/Order');

mongoose.connect('mongodb+srv://maharshibhattisro:TmMURbJBf7mLSnPh@users.o2fplbs.mongodb.net/electrohub?retryWrites=true&w=majority&appName=Users')
  .then(async () => {
    console.log('✅ MongoDB connected successfully');
    
    // Sample orders data
    const sampleOrders = [
      {
        id: 'ORD' + Date.now() + '001',
        userEmail: 'john@example.com',
        userName: 'John Doe',
        items: [
          {
            _id: '1',
            name: 'iPhone 15 Pro',
            price: 99999,
            quantity: 1,
            image: 'https://example.com/iphone.jpg'
          }
        ],
        total: 99999,
        discount: 10,
        status: 'Delivered',
        orderDate: new Date('2024-01-15'),
        shippingAddress: {
          firstName: 'John',
          lastName: 'Doe',
          address: '123 Main St',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400001',
          country: 'India'
        }
      },
      {
        id: 'ORD' + Date.now() + '002',
        userEmail: 'jane@example.com',
        userName: 'Jane Smith',
        items: [
          {
            _id: '2',
            name: 'MacBook Air M2',
            price: 129999,
            quantity: 1,
            image: 'https://example.com/macbook.jpg'
          },
          {
            _id: '3',
            name: 'AirPods Pro',
            price: 24999,
            quantity: 1,
            image: 'https://example.com/airpods.jpg'
          }
        ],
        total: 154998,
        discount: 0,
        status: 'Shipped',
        orderDate: new Date('2024-01-20'),
        shippingAddress: {
          firstName: 'Jane',
          lastName: 'Smith',
          address: '456 Oak Ave',
          city: 'Delhi',
          state: 'Delhi',
          zipCode: '110001',
          country: 'India'
        }
      },
      {
        id: 'ORD' + Date.now() + '003',
        userEmail: 'mike@example.com',
        userName: 'Mike Johnson',
        items: [
          {
            _id: '4',
            name: 'Samsung Galaxy S24',
            price: 89999,
            quantity: 1,
            image: 'https://example.com/galaxy.jpg'
          }
        ],
        total: 89999,
        discount: 15,
        status: 'Processing',
        orderDate: new Date('2024-01-25'),
        shippingAddress: {
          firstName: 'Mike',
          lastName: 'Johnson',
          address: '789 Pine Rd',
          city: 'Bangalore',
          state: 'Karnataka',
          zipCode: '560001',
          country: 'India'
        }
      }
    ];

    try {
      // Clear existing orders (optional)
      await Order.deleteMany({});
      console.log('🗑️ Cleared existing orders');

      // Insert sample orders
      const result = await Order.insertMany(sampleOrders);
      console.log(`✅ Added ${result.length} sample orders to database`);
      
      // Display the orders
      const allOrders = await Order.find();
      console.log('\n📋 Sample Orders:');
      allOrders.forEach(order => {
        console.log(`- ${order.id}: ${order.userName} - ₹${order.total} (${order.status})`);
      });

    } catch (error) {
      console.error('❌ Error creating sample orders:', error);
    } finally {
      mongoose.connection.close();
      console.log('🔌 Database connection closed');
    }
  })
  .catch(err => console.error('❌ MongoDB connection failed:', err)); 