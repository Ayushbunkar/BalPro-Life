import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import path from 'path';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to database
connectDB();

// Security middleware
app.use(helmet());
// CORS configuration
// In development allow all origins (so HMR, Vite dev server, etc. work without strict matching).
// In production keep a stricter allowlist based on CLIENT_URL.
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: true, credentials: true, optionSuccessStatus: 200 }));
  // Ensure preflight requests are handled immediately with CORS headers
  app.options('*', cors());
} else {
  const allowedOrigins = [process.env.CLIENT_URL].filter(Boolean);
  const corsOptions = {
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      return callback(new Error('CORS policy: This origin is not allowed.'), false);
    },
    credentials: true,
    optionSuccessStatus: 200
  };
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
}

// Rate limiting (apply after CORS so preflight and CORS headers are returned)
// In development we disable the limiter to avoid accidental 429s from HMR/dev tooling.
// Rate limiting (apply after CORS so preflight and CORS headers are returned)
// Controlled by `RATE_LIMIT_ENABLED` env var or enabled automatically in production.
const rateLimitEnabled = (process.env.RATE_LIMIT_ENABLED || '').toLowerCase() === 'true' || process.env.NODE_ENV === 'production';
if (rateLimitEnabled) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: Number(process.env.RATE_LIMIT_MAX || 100), // limit each IP to RATE_LIMIT_MAX requests per windowMs
    // Return JSON error so clients (and fetch) can parse it safely
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        message: 'Too many requests from this IP, please try again later.'
      });
    }
  });
  app.use(limiter);
  if (process.env.QUIET_STARTUP !== 'true') {
    console.log(`🔒 Rate limiter enabled (max ${process.env.RATE_LIMIT_MAX || 100} requests / ${process.env.RATE_LIMIT_WINDOW || 15} minutes)`);
  }
} else {
  if (process.env.QUIET_STARTUP !== 'true') {
    console.log('⚠️ Rate limiter is disabled. To enable set RATE_LIMIT_ENABLED=true or run with NODE_ENV=production.');
  }
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser (used for cookie-based auth flows)
app.use(cookieParser());

// Serve uploaded files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/auth', (await import('./routes/auth.js')).default);
app.use('/api/products', (await import('./routes/products.js')).default);
app.use('/api/orders', (await import('./routes/orders.js')).default);
app.use('/api/users', (await import('./routes/users.js')).default);
app.use('/api/admin', (await import('./routes/admin.js')).default);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'BalPro Life Server is running!',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 BalPro Life Server running on port ${PORT}`);
  console.log(`📱 Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;