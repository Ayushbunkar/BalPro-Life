# 🎁 Drink Reward System - Backend Setup & Usage Guide

## 📋 Quick Start

### 1. Installation

```bash
cd server
npm install
npm install qrcode  # Install QR code generator
```

### 2. Environment Setup

```bash
cp .env.example .env
# Edit .env with your configuration
```

**Critical Settings**:
```env
MONGODB_URI=mongodb://localhost:27017/balpro-life
JWT_SECRET=generate_a_strong_random_key_here
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
```

### 3. Database Setup

Ensure MongoDB is running:
```bash
# If using local MongoDB
mongod

# Or connect to MongoDB Atlas
# Update MONGODB_URI in .env with your Atlas connection string
```

### 4. Generate Test Data

```bash
npm run seed:codes
```

This will generate:
- ✅ 1000 test codes
- ✅ 30% winning codes
- ✅ Mixed reward types
- ✅ Unique QR codes for each
- ✅ Organized in a batch

Output example:
```
✅ Seeding completed successfully!
📊 Batch ID: BATCH-1711360200000-A1B2C3D4
📦 Total Codes: 1000
🎯 Winning Codes: 300
📋 Non-winning Codes: 700

📈 Reward Distribution:
   • Free Drink 250ml: 95
   • Free Drink 500ml: 110
   • 20% Discount: 45
   • 50% Discount: 35
   • Buy One Get One: 15
```

### 5. Start Server

```bash
npm run dev    # Development with hot reload
npm start      # Production
```

Server will be available at: `http://localhost:5000`

---

## 🧪 Testing the System

### Test Code Verification

```bash
# 1. Login/Get Token (replace with actual user credentials)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Save the returned token

# 2. Verify a Code
curl -X POST http://localhost:5000/api/codes/verify \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"code":"XXXX-XXXX-XXXX"}'

# Response example (if winning):
{
  "success": true,
  "message": "🎉 Congratulations! You Won!",
  "code": "WIN",
  "data": {
    "rewardId": "WIN-ABC123",
    "reward": "Free Drink 500ml",
    "expiresAt": "2026-03-27T...",
    "qrCode": "data:image/png;base64,..."
  }
}
```

### Test Admin Features

```bash
# 1. Get code statistics
curl -X GET http://localhost:5000/api/codes/stats \
  -H "Authorization: Bearer ADMIN_TOKEN"

# 2. Generate new codes
curl -X POST http://localhost:5000/api/codes/generate \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "totalCount": 5000,
    "winningCount": "25%",
    "rewardType": "mixed"
  }'

# 3. Get reward statistics
curl -X GET http://localhost:5000/api/rewards/stats/dashboard \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### Test Redemption

```bash
# Store staff redeems a reward
curl -X POST http://localhost:5000/api/rewards/redeem \
  -H "Authorization: Bearer STORE_STAFF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "rewardId": "WIN-ABC123",
    "storeId": "STORE-001",
    "storeName": "Downtown Location",
    "staffName": "John Doe"
  }'

# Response:
{
  "success": true,
  "message": "✅ Reward Redeemed Successfully!",
  "code": "REWARD_REDEEMED",
  "data": {
    "rewardId": "WIN-ABC123",
    "reward": "Free Drink 500ml",
    "userName": "Jane Smith",
    "redeemedAt": "2026-03-26T..."
  }
}
```

---

## 📁 Project Structure

```
server/
├── config/
│   ├── database.js          # MongoDB connection
│   └── cloudinary.js        # Image upload config
├── controllers/
│   ├── codes.js            # Code verification logic
│   ├── rewards.js          # Reward management logic
│   ├── auth.js             # Auth logic
│   ├── products.js         # Product logic
│   ├── users.js            # User logic
│   └── orders.js           # Order logic
├── middleware/
│   ├── auth.js             # Authentication & authorization
│   └── rateLimiters.js     # Rate limiting for different endpoints
├── models/
│   ├── Code.js            # Code schema
│   ├── Reward.js          # Reward schema
│   ├── User.js            # User schema
│   ├── Product.js         # Product schema
│   └── Order.js           # Order schema
├── routes/
│   ├── codes.js           # Code endpoints
│   ├── rewards.js         # Reward endpoints
│   ├── auth.js            # Auth endpoints
│   ├── products.js        # Product endpoints
│   ├── users.js           # User endpoints
│   ├── orders.js          # Order endpoints
│   └── admin.js           # Admin endpoints
├── utils/
│   ├── codeGenerator.js   # Code generation utilities
│   └── helpers.js         # Helper functions
├── scripts/
│   ├── seedAdmin.js       # Admin seeding script
│   └── seedCodes.js       # Code seeding script
├── uploads/
│   ├── avatars/           # User avatar storage
│   └── products/          # Product image storage
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env.example           # Environment template
└── README.md              # This file
```

---

## 🔗 API Endpoints Summary

### Public Endpoints
- `GET /api/health` - Health check

### Code Endpoints (Authentication Required)
- `POST /api/codes/verify` - Verify a code (with rate limiting)
- `GET /api/codes/stats` - Get statistics (admin only)
- `GET /api/codes` - Get all codes with filters (admin only)
- `POST /api/codes/generate` - Generate bulk codes (admin only)

### Reward Endpoints
- `GET /api/rewards/:rewardId` - Get reward details (public)
- `GET /api/rewards/user/my-rewards` - Get user's rewards (private)
- `POST /api/rewards/redeem` - Redeem a reward (private, rate limited)
- `POST /api/rewards/verify-qr` - Verify reward QR code (public)
- `GET /api/rewards/admin/all` - Get all rewards (admin only)
- `GET /api/rewards/stats/dashboard` - Get statistics (admin only)

### Other Endpoints
- Auth, Products, Users, Orders - See existing routes

---

## 🔒 Security Best Practices

### 1. Environment Variables
- ✅ Never commit `.env` file
- ✅ Use strong JWT_SECRET (min 32 characters)
- ✅ Rotate secrets regularly in production

### 2. Rate Limiting
- ✅ 5 code verification attempts per 15 minutes
- ✅ 10 reward redemption attempts per 5 minutes
- ✅ 5 code generations per hour

### 3. Authentication
- ✅ All sensitive endpoints require JWT token
- ✅ Admin endpoints require admin role verification
- ✅ Tokens expire after 30 days (configurable)

### 4. Database
- ✅ Use MongoDB with authentication
- ✅ Enable encryption at rest in production
- ✅ Regular backups scheduled

### 5. QR Codes
- ✅ Generated per code and per reward
- ✅ Encoded with reward ID
- ✅ Staff can scan instead of typing

---

## 📊 Monitoring & Debugging

### Enable Debug Logging
```bash
DEBUG=balpro-life:* npm run dev
```

### Database Connection Issues
```bash
# Test MongoDB connection
node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('Connected!')).catch(e => console.error(e))"
```

### Memory Usage
```bash
npm install -g clinic
clinic doctor -- npm start
```

### Performance Monitoring
```bash
# Check request performance
curl -w "\nTime: %{time_total}s\n" http://localhost:5000/api/health
```

---

## 🚀 Production Deployment

### Before Deploying
```bash
# 1. Test all endpoints
npm test

# 2. Build/compile TypeScript (if applicable)
npm run build

# 3. Start server
NODE_ENV=production npm start

# 4. Run in background with PM2
pm2 start server.js --name "balpro-api"
pm2 save
pm2 startup
```

### Environment Setup for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/balpro-life
JWT_SECRET=your_very_long_random_secret_key_here
CLIENT_URL=https://yourdomain.com
RATE_LIMIT_ENABLED=true
RATE_LIMIT_MAX=100
```

### Monitoring in Production
- Setup error tracking (Sentry, LogRocket, etc.)
- Enable request logging
- Monitor database performance
- Setup alerts for rate limit breaches

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "rate limit" error on code verify | Wait 15 minutes or use different IP. Admin users bypass. |
| "MongoDB connection refused" | Ensure MongoDB is running on port 27017 or check MONGODB_URI |
| "Invalid token" | Ensure token is valid and not expired. Re-login if needed. |
| "QR code not generating" | Run `npm install qrcode` to install generator |
| "Port already in use" | Change PORT in .env or kill process using port 5000 |
| "CORS errors" | Check CLIENT_URL in .env matches your frontend URL |

---

## 📞 Support Contacts

- **Documentation**: See `REWARD_SYSTEM_API.md`
- **Issues**: Check GitHub issues or contact dev team
- **Slack**: #balpro-backend channel

---

**Version**: 1.0.0
**Last Updated**: March 25, 2026
**Status**: Production Ready ✅
