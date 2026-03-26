# 🎁 Drink Reward Game - Complete API Documentation

## 📋 Overview

This is a complete production-ready backend system for managing a drink reward redemption platform. Users enter codes printed on bottles to win rewards, claim them online, and redeem them in-store.

---

## 🏗️ System Architecture

### Core Components:
1. **Code Verification System** - Validate codes from bottles
2. **Reward Generation System** - Create unique reward IDs when user wins
3. **Reward Redemption System** - Allow store staff to redeem rewards
4. **Admin Management** - Bulk code generation and monitoring
5. **Rate Limiting** - Prevent brute force attacks

### Database Models:

#### Code Model
```javascript
{
  code: String (unique), // XXXX-XXXX-XXXX format
  isWinning: Boolean,
  isUsed: Boolean,
  reward: String, // Enum of reward types
  usedBy: ObjectId (User reference),
  usedAt: Date,
  generatedAt: Date,
  expiresAt: Date,
  batchId: String,
  qrCode: String (data URL)
}
```

#### Reward Model
```javascript
{
  rewardId: String (unique), // WIN-XXXXXX format
  code: ObjectId (Code reference),
  userId: ObjectId (User reference),
  reward: String,
  isRedeemed: Boolean,
  createdAt: Date,
  expiresAt: Date,
  redeemedAt: Date,
  redeemedByStore: {
    storeId: String,
    storeName: String,
    staffName: String
  },
  qrCode: String (data URL),
  status: Enum ['active', 'redeemed', 'expired']
}
```

---

## 🔐 API Endpoints

### ✅ CODES API

#### 1. Verify Code (User Submits Code)
**Post /api/codes/verify**
- **Auth**: Required (user must be logged in)
- **Rate Limit**: 5 attempts per 15 minutes
- **Request**:
```json
{
  "code": "XXXX-XXXX-XXXX"
}
```

- **Success Response (WIN)**: 200
```json
{
  "success": true,
  "message": "🎉 Congratulations! You Won",
  "code": "WIN",
  "data": {
    "rewardId": "WIN-A1B2C3D4",
    "reward": "Free Drink 500ml",
    "message": "You won a Free Drink 500ml!",
    "expiresAt": "2026-03-27T10:30:00Z",
    "qrCode": "data:image/png;base64,...",
    "instructions": "Visit any authorized store...",
    "claimUrl": "/redemption?rewardId=WIN-A1B2C3D4"
  }
}
```

- **No Win Response**: 200
```json
{
  "success": true,
  "message": "Better luck next time!",
  "code": "NO_WIN",
  "data": {
    "message": "Thank you for participating. Please try another code.",
    "nextSteps": "Check another bottle or visit our store..."
  }
}
```

- **Error Responses**:
  - 400: Invalid code format
  - 404: Code not found
  - 400: Code already used
  - 410: Code expired

---

#### 2. Get Code Statistics (Admin)
**GET /api/codes/stats**
- **Auth**: Required + Admin role
- **Response**: 200
```json
{
  "success": true,
  "data": {
    "totalCodes": 10000,
    "usedCodes": 3250,
    "unusedCodes": 6750,
    "winningCodes": 3000,
    "usedWinningCodes": 975,
    "winRate": "30.00%",
    "redemptionRate": "32.50%",
    "conversionRate": "30.00%"
  }
}
```

---

#### 3. Get All Codes (Admin)
**GET /api/codes?used=true&winning=false&page=1&limit=20&batchId=BATCH-123**
- **Auth**: Required + Admin role
- **Query Parameters**:
  - `used`: Boolean (filter by usage status)
  - `winning`: Boolean (filter by winning status)
  - `page`: Integer (default: 1)
  - `limit`: Integer (default: 20, max: 100)
  - `batchId`: String (filter by batch)

- **Response**: 200
```json
{
  "success": true,
  "pagination": {
    "total": 1500,
    "page": 1,
    "pages": 75
  },
  "data": [
    {
      "_id": "...",
      "code": "XXXX-XXXX-XXXX",
      "isWinning": true,
      "isUsed": false,
      "reward": "Free Drink 250ml",
      "createdAt": "2026-03-25T..."
    }
  ]
}
```

---

#### 4. Generate Bulk Codes (Admin)
**POST /api/codes/generate**
- **Auth**: Required + Admin role
- **Rate Limit**: 5 generations per hour
- **Request**:
```json
{
  "totalCount": 5000,
  "winningCount": "30%",
  "rewardType": "mixed"
}
```

- **Response**: 202 (Accepted - processes in background)
```json
{
  "success": true,
  "message": "Code generation started...",
  "totalCount": 5000
}
```

- **Reward Types**: `mixed`, `drink`, `discount`, `premium`
- **Winning Count**: Can be percentage (e.g., "30%") or number (e.g., 1500)

---

#### 5. Delete Code Batch (Admin)
**DELETE /api/codes/batch/:batchId**
- **Auth**: Required + Admin role
- **Response**: 200
```json
{
  "success": true,
  "message": "Deleted 5000 codes from batch",
  "deletedCount": 5000
}
```

---

### 🎁 REWARDS API

#### 1. Get Reward Details
**GET /api/rewards/:rewardId**
- **Auth**: Optional (public access)
- **Response**: 200
```json
{
  "success": true,
  "data": {
    "rewardId": "WIN-A1B2C3D4",
    "reward": "Free Drink 500ml",
    "isRedeemed": false,
    "expiresAt": "2026-03-27T10:30:00Z",
    "qrCode": "data:image/png;base64,...",
    "status": "active"
  }
}
```

---

#### 2. Get User's Rewards
**GET /api/rewards/user/my-rewards?filter=active**
- **Auth**: Required
- **Query Parameters**:
  - `filter`: `all`, `active`, `redeemed`, `expired` (default: all)

- **Response**: 200
```json
{
  "success": true,
  "data": [
    {
      "rewardId": "WIN-A1B2C3D4",
      "reward": "Free Drink 500ml",
      "isRedeemed": false,
      "expiresAt": "2026-03-27T10:30:00Z",
      "status": "active",
      "qrCode": "data:image/png;base64,..."
    }
  ]
}
```

---

#### 3. Redeem Reward (Store Staff)
**POST /api/rewards/redeem**
- **Auth**: Required
- **Rate Limit**: 10 attempts per 5 minutes
- **Request**:
```json
{
  "rewardId": "WIN-A1B2C3D4",
  "storeId": "STORE-001",
  "storeName": "Downtown Location",
  "staffName": "John Doe"
}
```

- **Success Response**: 200
```json
{
  "success": true,
  "message": "✅ Reward Redeemed Successfully!",
  "code": "REWARD_REDEEMED",
  "data": {
    "rewardId": "WIN-A1B2C3D4",
    "reward": "Free Drink 500ml",
    "userName": "Jane Smith",
    "redeemedAt": "2026-03-26T10:30:00Z",
    "redeemedByStore": {
      "storeId": "STORE-001",
      "storeName": "Downtown Location",
      "staffName": "John Doe"
    }
  }
}
```

- **Error Responses**:
  - 404: Reward not found
  - 400: Already redeemed
  - 410: Reward expired

---

#### 4. Verify Reward QR Code
**POST /api/rewards/verify-qr**
- **Auth**: Optional
- **Request**:
```json
{
  "rewardId": "WIN-A1B2C3D4"
}
```

- **Response**: 200
```json
{
  "success": true,
  "message": "Valid Reward",
  "data": {
    "rewardId": "WIN-A1B2C3D4",
    "reward": "Free Drink 500ml",
    "isRedeemed": false,
    "expiresAt": "2026-03-27T10:30:00Z"
  }
}
```

---

#### 5. Get All Rewards (Admin)
**GET /api/rewards/admin/all?filter=active&page=1&limit=50**
- **Auth**: Required + Admin role
- **Query Parameters**:
  - `filter`: `all`, `active`, `redeemed`, `expired`
  - `page`: Integer
  - `limit`: Integer

- **Response**: 200
```json
{
  "success": true,
  "pagination": {
    "total": 975,
    "page": 1,
    "pages": 20
  },
  "stats": {
    "totalActive": 850,
    "totalRedeemed": 100,
    "totalExpired": 25
  },
  "data": [...]
}
```

---

#### 6. Get Reward Statistics (Admin)
**GET /api/rewards/stats/dashboard**
- **Auth**: Required + Admin role
- **Response**: 200
```json
{
  "success": true,
  "data": {
    "summary": {
      "total": 1000,
      "active": 850,
      "redeemed": 100,
      "expired": 50,
      "redemptionRate": "10.00"
    },
    "rewardBreakdown": [
      {
        "_id": "Free Drink 500ml",
        "count": 400,
        "redeemed": 50
      },
      {
        "_id": "Free Drink 250ml",
        "count": 300,
        "redeemed": 30
      }
    ],
    "dailyRedemptions": [
      {
        "_id": "2026-03-25",
        "count": 15
      }
    ]
  }
}
```

---

## 🔒 Security Features

### Rate Limiting
- **Code Verification**: 5 attempts per 15 minutes per user
- **Reward Redemption**: 10 attempts per 5 minutes per user
- **Code Generation**: 5 generations per hour (admin only)
- **Admin Skip**: Rate limits skip for admin users

### Input Validation
- Code format validation (XXXX-XXXX-XXXX)
- Secure random code generation (non-predictable)
- Atomic database updates (no duplicate redemptions)

### Authentication
- JWT-based authentication
- Protected routes require valid token
- Admin role verification for sensitive operations

### Data Protection
- Password hashing (bcryptjs)
- HTTPS in production
- CORS enabled with origin checking
- Helmet security headers

---

## 📊 Seeding Test Data

### Generate Test Codes
```bash
npm run seed:codes
```

This generates 1000 test codes with:
- 30% winning codes
- Mixed reward types
- Automatic QR code generation
- Organized in a batch for management

### Manual Code Generation (via API)
```bash
curl -X POST http://localhost:5000/api/codes/generate \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "totalCount": 10000,
    "winningCount": "25%",
    "rewardType": "mixed"
  }'
```

---

## 🌍 Environment Variables

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/balpro-life

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d

# CORS
CLIENT_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_ENABLED=true
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=15

# QR Code (optional)
QR_CODE_SIZE=300

# Cloudinary (optional, for image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env)
```env
VITE_API_BASE=http://localhost:5000/api
```

---

## 🎯 Workflow Example

###  Complete User Journey

#### 1. User enters code:
```
POST /api/codes/verify
Payload: { "code": "ABCD-EFGH-IJKL" }
```

#### 2. Backend response (if WIN):
```
{
  "success": true,
  "code": "WIN",
  "data": {
    "rewardId": "WIN-123ABC",
    "reward": "Free Drink 500ml",
    "expiresAt": "2026-03-27T...",
    "qrCode": "data:image/png;..."
  }
}
```

#### 3. Frontend displays reward page with QR code

#### 4. User visits store and shows QR code to staff

#### 5. Staff scans QR or enters reward ID:
```
POST /api/rewards/redeem
Payload: {
  "rewardId": "WIN-123ABC",
  "storeId": "STORE-001",
  "storeName": "Downtown",
  "staffName": "John"
}
```

#### 6. Backend confirms redemption:
```
{
  "success": true,
  "message": "✅ Reward Redeemed Successfully",
  "data": {
    "rewardId": "WIN-123ABC",
    "reward": "Free Drink 500ml",
    "userName": "Jane Smith",
    "redeemedAt": "2026-03-26..."
  }
}
```

#### 7. Staff provides free drink to user

---

## 🚀 Deployment Checklist

- [ ] Set all environment variables
- [ ] Generate production codes with seed script
- [ ] Enable HTTPS
- [ ] Enable rate limiting (set NODE_ENV=production)
- [ ] Setup MongoDB Atlas or similar cloud database
- [ ] Configure CORS properly for your domain
- [ ] Setup regular backups
- [ ] Monitor error logs
- [ ] Test all endpoints with production data
- [ ] Setup monitoring/alerts

---

## 📞 Support & Troubleshooting

### Common Issues

**Q: Rate limit exceeded error**
- A: Wait for the rate limit window to reset, or use an admin account to bypass

**Q: Invalid code format error**
- A: Ensure code matches format XXXX-XXXX-XXXX (12 digits with hyphens)

**Q: Code already used error**
- A: This code has been redeemed. Please try a different code.

**Q: QR code not generating**
- A: Ensure `qrcode` package is installed: `npm install qrcode`

---

## 📝 Notes

- Codes expire after 90 days (configurable in Code model)
- Rewards expire after 48 hours by default (configurable)
- MongoDB TTL index automatically removes expired rewards
- Background code generation prevents blocking
- All timestamps use UTC (ISO 8601 format)

---

**Last Updated**: March 25, 2026
**Version**: 1.0.0
