import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import path from 'path';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import userRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';
import codeRoutes from './routes/codes.js';
import rewardRoutes from './routes/rewards.js';
import gameRoutes from './routes/game.js';
import dashboardRoutes from './routes/dashboard.js';
import analyticsRoutes from './routes/analytics.js';
import cartRoutes from './routes/cartRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

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
      if (process.env.VERCEL && normalizedOrigin.endsWith('.vercel.app')) {
        return callback(null, true);
      }
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

const openApiSpec = YAML.load(path.join(process.cwd(), 'docs', 'openapi.yaml'));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.get('/api/docs/openapi.yaml', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'docs', 'openapi.yaml'));
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/codes', codeRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/game', gameRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'BalPro Life Server is running!',
    timestamp: new Date().toISOString()
  });
});

app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 BalPro Life Server running on port ${PORT}`);
    console.log(`📱 Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

export default app;
