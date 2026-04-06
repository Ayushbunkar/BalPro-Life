import User from '../models/User.js';
import Order from '../models/Order.js';
import LoyaltyRedemption from '../models/LoyaltyRedemption.js';
import Product from '../models/Product.js';

const POINTS_PER_HUNDRED_RUPEES = Number(process.env.POINTS_PER_HUNDRED_RUPEES || 10);
const FREE_DRINK_POINTS = Number(process.env.FREE_DRINK_POINTS || 100);
const AVAILABLE_REWARD_KEYS = ['CHOCOLATE_SINGLE', 'VANILLA_SINGLE'];

const buildRedemptionCode = () => {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `FD-${Date.now().toString().slice(-6)}-${random}`;
};

export const calculatePointsFromAmount = (amount) => {
  const safeAmount = Number(amount || 0);
  if (!Number.isFinite(safeAmount) || safeAmount <= 0) {
    return 0;
  }

  return Math.floor(safeAmount / 100) * POINTS_PER_HUNDRED_RUPEES;
};

export const awardPointsForOrder = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error('Order not found for points awarding');
  }

  if (!order.isPaid || order.pointsAwarded) {
    return {
      awarded: false,
      points: Number(order.pointsEarned || 0),
    };
  }

  const earnedPoints = calculatePointsFromAmount(order.totalPrice);

  await User.findByIdAndUpdate(order.user, {
    $inc: {
      rewardPoints: earnedPoints,
      lifetimeRewardPoints: earnedPoints,
    },
  });

  order.pointsAwarded = true;
  order.pointsEarned = earnedPoints;
  order.pointsAwardedAt = new Date();
  await order.save();

  return {
    awarded: true,
    points: earnedPoints,
  };
};

export const getUserPointsSummary = async (userId) => {
  const user = await User.findById(userId).select('rewardPoints lifetimeRewardPoints');
  if (!user) {
    throw new Error('User not found');
  }

  const currentPoints = Number(user.rewardPoints || 0);
  const lifetimePoints = Number(user.lifetimeRewardPoints || 0);
  const currentCyclePoints = currentPoints % FREE_DRINK_POINTS;
  const progressPercent = Math.floor((currentCyclePoints / FREE_DRINK_POINTS) * 100);
  const nextMilestone = currentPoints >= FREE_DRINK_POINTS
    ? currentPoints + FREE_DRINK_POINTS
    : FREE_DRINK_POINTS;
  const pointsToNextMilestone = Math.max(0, nextMilestone - currentPoints);
  const redeemableFreeDrinks = Math.floor(currentPoints / FREE_DRINK_POINTS);

  return {
    currentPoints,
    lifetimePoints,
    freeDrinkThreshold: FREE_DRINK_POINTS,
    redeemableFreeDrinks,
    currentCyclePoints,
    progressPercent,
    nextMilestone,
    pointsToNextMilestone,
  };
};

export const redeemFreeDrinkWithPoints = async (userId, rewardItem = 'CHOCOLATE_SINGLE') => {
  if (!AVAILABLE_REWARD_KEYS.includes(rewardItem)) {
    throw new Error('Invalid reward item selected');
  }

  const updatedUser = await User.findOneAndUpdate(
    {
      _id: userId,
      rewardPoints: { $gte: FREE_DRINK_POINTS },
    },
    {
      $inc: {
        rewardPoints: -FREE_DRINK_POINTS,
      },
    },
    {
      new: true,
    },
  );

  if (!updatedUser) {
    throw new Error(`At least ${FREE_DRINK_POINTS} points are required to redeem a free drink`);
  }

  const redemption = await LoyaltyRedemption.create({
    user: userId,
    redemptionCode: buildRedemptionCode(),
    rewardType: 'FREE_DRINK',
    rewardItem,
    pointsUsed: FREE_DRINK_POINTS,
    status: 'active',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  return {
    redemption,
    currentPoints: Number(updatedUser.rewardPoints || 0),
  };
};

export const getUserRedemptions = async (userId) => {
  return LoyaltyRedemption.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();
};

const mapProductToReward = (product, rewardKey, currentPoints) => ({
  rewardKey,
  title: product?.name || (rewardKey === 'CHOCOLATE_SINGLE' ? 'BalPro Chocolate Single Bottle' : 'BalPro Vanilla Single Bottle'),
  description: product?.description || 'Redeem your points for one premium single bottle.',
  pointsRequired: FREE_DRINK_POINTS,
  canRedeem: currentPoints >= FREE_DRINK_POINTS,
  image: product?.images?.[0]?.url || '',
});

export const getAvailableRewards = async (currentPoints) => {
  const [chocolate, vanilla] = await Promise.all([
    Product.findOne({
      isActive: true,
      'inventory.sku': 'BALPRO-CHOC-001',
    }).lean(),
    Product.findOne({
      isActive: true,
      'inventory.sku': 'BALPRO-VANI-001',
    }).lean(),
  ]);

  return [
    mapProductToReward(chocolate, 'CHOCOLATE_SINGLE', currentPoints),
    mapProductToReward(vanilla, 'VANILLA_SINGLE', currentPoints),
  ];
};

export const getUserRewardHistory = async (userId) => {
  const [orders, redemptions] = await Promise.all([
    Order.find({ user: userId, pointsAwarded: true, pointsEarned: { $gt: 0 } })
      .sort({ pointsAwardedAt: -1 })
      .limit(20)
      .lean(),
    LoyaltyRedemption.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean(),
  ]);

  const earnEntries = orders.map((order) => ({
    id: `earn-${order._id}`,
    type: 'EARNED',
    label: 'Order Payment',
    date: order.pointsAwardedAt || order.updatedAt || order.createdAt,
    pointsChange: Number(order.pointsEarned || 0),
    sub: `Order #${String(order._id).slice(-6).toUpperCase()}`,
  }));

  const redeemEntries = redemptions.map((redemption) => ({
    id: `redeem-${redemption._id}`,
    type: 'REDEEMED',
    label: redemption.rewardItem === 'VANILLA_SINGLE' ? 'Vanilla Single Bottle' : 'Chocolate Single Bottle',
    date: redemption.createdAt,
    pointsChange: -Number(redemption.pointsUsed || FREE_DRINK_POINTS),
    sub: `Code ${redemption.redemptionCode}`,
    status: redemption.status,
  }));

  return [...earnEntries, ...redeemEntries]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 30);
};

export const getLoyaltyDashboardData = async (userId) => {
  const summary = await getUserPointsSummary(userId);
  const [availableRewards, rewardHistory, redemptions] = await Promise.all([
    getAvailableRewards(summary.currentPoints),
    getUserRewardHistory(userId),
    getUserRedemptions(userId),
  ]);

  return {
    summary,
    availableRewards,
    rewardHistory,
    redemptions,
  };
};
