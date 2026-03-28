import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Code from '../models/Code.js';

dotenv.config();

const connectUri = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost:27017/balpro-life';
const targetBatchId = process.argv[2] ? process.argv[2] : null;

await mongoose.connect(connectUri);

const total = await Code.countDocuments();
const latest = await Code.find().sort({ createdAt: -1 }).limit(300).lean();

const batchCounts = {};
for (const item of latest) {
  const key = item.batchId ? item.batchId : 'NO_BATCH';
  batchCounts[key] = (batchCounts[key] || 0) + 1;
}

const topBatchEntry = Object.entries(batchCounts).sort((a, b) => b[1] - a[1])[0];

console.log(`TOTAL_CODES=${total}`);

if (topBatchEntry) {
  const batchId = targetBatchId || topBatchEntry[0];
  const count = targetBatchId ? await Code.countDocuments({ batchId }) : topBatchEntry[1];
  const sourceItems = targetBatchId
    ? await Code.find({ batchId }).sort({ createdAt: -1 }).limit(100).lean()
    : latest.filter((item) => item.batchId === batchId).slice(0, 100);
  const sampleCodes = sourceItems.map((item) => item.code);

  console.log(`LATEST_BATCH=${batchId}`);
  console.log(`LATEST_BATCH_COUNT_IN_LAST_300=${count}`);
  console.log(`SAMPLE_CODES=${JSON.stringify(sampleCodes)}`);
}

await mongoose.connection.close();
