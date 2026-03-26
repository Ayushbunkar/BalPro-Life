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
// In production keep a stricter allowlist from CLIENT_URL/CLIENT_URLS plus local dev origins.
const corsAllowAll = (process.env.CORS_ALLOW_ALL || '').toLowerCase() === 'true';

if (corsAllowAll) {
  app.use(cors({ origin: true, credentials: true, optionSuccessStatus: 200 }));
} else if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: true, credentials: true, optionSuccessStatus: 200 }));
} else {
  const normalizeOrigin = (value) => (value || '').trim().replace(/\/+$/, '');

  const envOrigins = [
    process.env.CLIENT_URL,
    ...(process.env.CLIENT_URLS || '').split(',').map((origin) => origin.trim())
  ]
    .filter(Boolean)
    .map(normalizeOrigin);

  const allowedOrigins = Array.from(new Set([
    ...envOrigins,
    normalizeOrigin('http://localhost:5173'),
    normalizeOrigin('http://127.0.0.1:5173')
  ]));

  const corsOptions = {
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      const normalizedOrigin = normalizeOrigin(origin);
      if (allowedOrigins.indexOf(normalizedOrigin) !== -1) {
        return callback(null, true);
      }
      return callback(new Error('CORS policy: This origin is not allowed.'), false);
    },
    credentials: true,
    optionSuccessStatus: 200
  };
  app.use(cors(corsOptions));
}

// Rate limiting (apply after CORS so preflight and CORS headers are returned)
// Controlled only by `RATE_LIMIT_ENABLED` env var.
const rateLimitEnabled = (process.env.RATE_LIMIT_ENABLED || '').toLowerCase() === 'true';
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
    console.log('⚠️ Rate limiter is disabled. To enable set RATE_LIMIT_ENABLED=true.');
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
try {
  app.use('/api/auth', (await import('./routes/auth.js')).default);
  app.use('/api/products', (await import('./routes/products.js')).default);
  app.use('/api/orders', (await import('./routes/orders.js')).default);
  app.use('/api/users', (await import('./routes/users.js')).default);
  app.use('/api/admin', (await import('./routes/admin.js')).default);
  app.use('/api/codes', (await import('./routes/codes.js')).default);
  app.use('/api/rewards', (await import('./routes/rewards.js')).default);
    app.use('/api/game', (await import('./routes/game.js')).default);
} catch (error) {
  console.error('Error loading routes:', error);
  process.exit(1);
}

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'BalPro Life Server is running!',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
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