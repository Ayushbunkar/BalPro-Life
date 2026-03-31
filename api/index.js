/**
 * Vercel Serverless API Entry Point
 * Routes all /api/* requests to the Express app
 */

// Load env vars first
import dotenv from 'dotenv';
dotenv.config({ path: '../server/.env' });

import app from '../server/server.js';

export default app;
