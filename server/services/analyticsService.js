import User from '../models/User.js';
import Order from '../models/Order.js';

export const getRevenueAnalyticsService = async () => {
  const monthlyRevenue = await Order.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        value: { $sum: '$totalPrice' }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
    { $limit: 12 }
  ]);

  return monthlyRevenue.map((row) => ({
    label: `${row._id.year}-${String(row._id.month).padStart(2, '0')}`,
    value: row.value
  }));
};

export const getUserAnalyticsService = async () => {
  const monthlyUsers = await User.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        value: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
    { $limit: 12 }
  ]);

  return monthlyUsers.map((row) => ({
    label: `${row._id.year}-${String(row._id.month).padStart(2, '0')}`,
    value: row.value
  }));
};

export const getConversionAnalyticsService = async () => {
  const [ordersCount, usersCount] = await Promise.all([
    Order.countDocuments(),
    User.countDocuments()
  ]);

  const conversionRate = usersCount === 0 ? 0 : Number(((ordersCount / usersCount) * 100).toFixed(2));

  return {
    usersCount,
    ordersCount,
    conversionRate
  };
};
