import crypto from 'crypto';
import QRCode from 'qrcode';

/**
 * Generate a unique code with format: XXXX-XXXX-XXXX
 * @returns {string} Formatted unique code
 */
export const generateUniqueCode = () => {
  const randomBytes = crypto.randomBytes(9).toString('hex').toUpperCase();
  const code = `${randomBytes.slice(0, 4)}-${randomBytes.slice(4, 8)}-${randomBytes.slice(8, 12)}`;
  return code;
};

/**
 * Generate batch of unique codes
 * @param {number} count - Number of codes to generate
 * @returns {string[]} Array of unique codes
 */
export const generateCodeBatch = (count) => {
  const codes = new Set();
  while (codes.size < count) {
    codes.add(generateUniqueCode());
  }
  return Array.from(codes);
};

/**
 * Configure winning codes distribution
 * @param {number} totalCount - Total number of codes
 * @param {number|string} winningCount - Number or percentage of winning codes
 * @returns {boolean[]} Array where true = winning, false = non-winning
 */
export const distributeWinningCodes = (totalCount, winningCount) => {
  let winCount = winningCount;

  // If percentage format (ends with %)
  if (typeof winningCount === 'string' && winningCount.includes('%')) {
    const percentage = parseInt(winningCount);
    winCount = Math.floor((totalCount * percentage) / 100);
  } else {
    winCount = parseInt(winningCount);
  }

  // Ensure winCount doesn't exceed totalCount
  winCount = Math.min(winCount, totalCount);

  // Create array with winning codes at random positions
  const distribution = Array(totalCount).fill(false);
  const winningIndices = new Set();

  while (winningIndices.size < winCount) {
    winningIndices.add(Math.floor(Math.random() * totalCount));
  }

  winningIndices.forEach(idx => {
    distribution[idx] = true;
  });

  return distribution;
};

/**
 * Select reward based on reward type configuration
 * @param {string} rewardType - Type: 'mixed', 'drink', or 'discount'
 * @returns {string} Reward description
 */
export const selectReward = (rewardType = 'mixed') => {
  const drinkRewards = ['Free Drink 250ml', 'Free Drink 500ml'];
  const discountRewards = ['20% Discount', '50% Discount', 'Buy One Get One'];
  const premiumRewards = ['Free Premium Bundle'];

  let rewardPool = [];

  switch (rewardType) {
    case 'drink':
      rewardPool = drinkRewards;
      break;
    case 'discount':
      rewardPool = discountRewards;
      break;
    case 'premium':
      rewardPool = premiumRewards;
      break;
    case 'mixed':
    default:
      rewardPool = [...drinkRewards, ...discountRewards, ...premiumRewards];
  }

  return rewardPool[Math.floor(Math.random() * rewardPool.length)];
};

/**
 * Generate QR code as Data URL
 * @param {string} text - Text/data to encode in QR code
 * @returns {Promise<string>} QR code as Data URL
 */
export const generateQRCode = async (text) => {
  try {
    const qrCode = await QRCode.toDataURL(text, {
      width: 300,
      margin: 1,
      color: {
        dark: '#efbf70',
        light: '#19120f'
      }
    });
    return qrCode;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

/**
 * Generate reward ID (WIN-XXXXXX format)
 * @returns {string} Unique reward ID
 */
export const generateRewardId = () => {
  const randomPart = crypto.randomBytes(6).toString('hex').toUpperCase();
  return `WIN-${randomPart}`;
};

/**
 * Calculate expiry time
 * @param {number} hours - Hours from now
 * @returns {Date} Expiry date
 */
export const calculateExpiryTime = (hours = 48) => {
  return new Date(Date.now() + hours * 60 * 60 * 1000);
};

/**
 * Validate code format
 * @param {string} code - Code to validate
 * @returns {boolean} True if valid format
 */
export const validateCodeFormat = (code) => {
  const codeRegex = /^[A-Z0-9-]+$/;
  return codeRegex.test(code) && code.length >= 10;
};

/**
 * Generate batch ID for tracking code generation
 * @returns {string} Batch ID
 */
export const generateBatchId = () => {
  return `BATCH-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
};
