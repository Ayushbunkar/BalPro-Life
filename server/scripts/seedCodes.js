import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Code from '../models/Code.js';
import { 
  generateCodeBatch, 
  distributeWinningCodes,
  selectReward,
  generateBatchId,
  generateQRCode
} from '../utils/codeGenerator.js';

dotenv.config();

const cliTotal = Number(process.argv[2]);
const cliWinning = process.argv[3];
const cliRewardType = process.argv[4];

const seedCodes = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/balpro-life');
    console.log('✅ Connected to MongoDB');

    // Configuration
    const TOTAL_CODES = Number.isFinite(cliTotal) && cliTotal > 0 ? cliTotal : 1000;
    const WINNING_PERCENTAGE = cliWinning || '30';
    const REWARD_TYPE = cliRewardType || 'mixed';

    console.log(`\n🎲 Generating ${TOTAL_CODES} codes (${WINNING_PERCENTAGE}% winning)...`);

    const batchId = generateBatchId();
    const codeCodes = generateCodeBatch(TOTAL_CODES);
    const distribution = distributeWinningCodes(TOTAL_CODES, WINNING_PERCENTAGE);
    
    const codeObjects = [];
    let processed = 0;

    for (let i = 0; i < TOTAL_CODES; i++) {
      const isWinning = distribution[i];
      const reward = isWinning ? selectReward(REWARD_TYPE) : 'No reward';
      const qrCode = await generateQRCode(codeCodes[i]);

      codeObjects.push({
        code: codeCodes[i],
        isWinning,
        reward,
        batchId,
        qrCode,
        generatedAt: new Date(),
        createdAt: new Date()
      });

      processed++;
      if (processed % 100 === 0) {
        console.log(`   📝 Generated ${processed}/${TOTAL_CODES} codes...`);
      }
    }

    // Insert into database
    console.log(`\n💾 Inserting codes into database...`);
    await Code.insertMany(codeObjects, { ordered: false });

    console.log(`\n✅ Seeding completed successfully!`);
    console.log(`📊 Batch ID: ${batchId}`);
    console.log(`📦 Total Codes: ${TOTAL_CODES}`);
    console.log(`🎯 Winning Codes: ${Math.floor((TOTAL_CODES * parseInt(WINNING_PERCENTAGE)) / 100)}`);
    console.log(`📋 Non-winning Codes: ${TOTAL_CODES - Math.floor((TOTAL_CODES * parseInt(WINNING_PERCENTAGE)) / 100)}`);

    // Get database stats
    const stats = await Code.aggregate([
      {
        $match: { batchId }
      },
      {
        $group: {
          _id: '$reward',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    console.log(`\n📈 Reward Distribution:`);
    stats.forEach(item => {
      console.log(`   • ${item._id}: ${item.count}`);
    });

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding codes:', error);
    process.exit(1);
  }
};

seedCodes();
