
# Electrohub

**Electrohub** is a web application where users can browse and purchase electronic items.  
It is built using the **MERN stack** (MongoDB, Express.js, React, Node.js).

---

## 🔧 Technologies Used

- **MongoDB Atlas** (Database)
- **Express.js** (Backend framework)
- **React.js** (Frontend UI)
- **Node.js** (Server runtime)

---

## 🛠️ MongoDB Atlas Configuration

> **Important:** Keep credentials secure and avoid pushing them to public repos.

- **MongoDB Atlas Server Password:** `TmMURbJBf7mLSnPh`
- Make sure to use this password while connecting using Mongoose or MongoDB Compass.

---

## 📦 Server Collections

The application uses the following **MongoDB collections**:

| Collection Name | Description                              |
|-----------------|------------------------------------------|
| `users`         | Stores registered user data              |
| `products`      | Stores electronic product information    |
| `banners`       | Stores promotional banner image data     |

---

## 📁 Project Structure (Backend)

```

/backend
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Banner.js
├── routes/
├── controllers/
├── server.js
└── config/

````

---

## 🚀 Getting Started

1. Clone the repository  
2. Run `npm install` in both `/client` and `/backend` folders  
3. Set up your `.env` file with Mongo URI  
4. Run the app:

```bash
# Backend
cd backend
npm start

# Frontend
cd client
npm start
````

---

Let me know if you'd like this README to include **API routes**, **frontend structure**, or **deployment instructions** (like for Netlify or Render).
