# BalPro Life Server

Backend API server for the BalPro Life e-commerce application built with Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication & Authorization** - JWT-based auth with role-based access control
- **Product Management** - Full CRUD operations for products with categories and inventory
- **Order Management** - Complete order lifecycle from creation to delivery
- **Security** - Helmet, CORS, rate limiting, input validation
- **Database** - MongoDB with Mongoose ODM
- **API Documentation** - RESTful API endpoints

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd balpro-life/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/balpro-life
   JWT_SECRET=your_super_secret_jwt_key_here
   CLIENT_URL=http://localhost:5179
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or update the `MONGODB_URI` to point to your cloud database.

5. **Run the server**
   ```bash
   # Development mode with auto-restart
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000` (or your configured PORT).

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password

### Products
- `GET /api/products` - Get all products (with filtering/pagination)
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured` - Get featured products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search?q=searchterm` - Search products
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders
- `GET /api/orders/my-orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/cancel` - Cancel order
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Health Check
- `GET /api/health` - Server health check

## 🔧 Project Structure

```
server/
├── config/
│   └── database.js          # Database connection
├── controllers/
│   ├── auth.js             # Authentication controllers
│   ├── products.js         # Product controllers
│   ├── orders.js           # Order controllers
│   └── users.js            # User management controllers
├── middleware/
│   └── auth.js             # Authentication middleware
├── models/
│   ├── User.js             # User model
│   ├── Product.js          # Product model
│   └── Order.js            # Order model
├── routes/
│   ├── auth.js             # Auth routes
│   ├── products.js         # Product routes
│   ├── orders.js           # Order routes
│   └── users.js            # User routes
├── utils/
│   └── helpers.js          # Utility functions
├── .env.example            # Environment template
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies and scripts
├── server.js              # Main server file
└── README.md              # This file
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for password security
- **Rate Limiting** - Prevents brute force attacks
- **CORS** - Cross-origin resource sharing configuration
- **Helmet** - Security headers
- **Input Validation** - express-validator for request validation
- **Role-based Access Control** - User and admin roles

## 🧪 Testing

```bash
npm test
```

## 📦 Deployment

1. Set `NODE_ENV=production` in your environment
2. Configure production database URL
3. Set secure JWT secret
4. Configure proper CORS origins
5. Use a process manager like PM2 in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support, email support@balprolife.com or create an issue in the repository.