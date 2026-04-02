import User from '../models/User.js';
import Order from '../models/Order.js';

export const getDashboardStatsService = async () => {
  const [totalUsers, totalOrders, revenueAgg, ordersLastMonth, ordersPrevMonth] = await Promise.all([
    User.countDocuments(),
    Order.countDocuments(),
    Order.aggregate([{ $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } }]),
    Order.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 30))
      }
    }),
    Order.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 60)),
        $lt: new Date(new Date().setDate(new Date().getDate() - 30))
      }
    })
  ]);

  const totalRevenue = revenueAgg[0]?.totalRevenue || 0;
  const growthPercent = ordersPrevMonth === 0
    ? 100
    : Number((((ordersLastMonth - ordersPrevMonth) / ordersPrevMonth) * 100).toFixed(2));

  return {
    totalUsers,
    totalRevenue,
    totalOrders,
    growthPercent
  };
};

export const getDashboardAnalyticsService = async () => {
  const salesOverTime = await Order.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        revenue: { $sum: '$totalPrice' },
        orders: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
    { $limit: 12 }
  ]);

  const usersByMonth = await User.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        users: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
    { $limit: 12 }
  ]);

  return {
    salesOverTime: salesOverTime.map((row) => ({
      label: `${row._id.year}-${String(row._id.month).padStart(2, '0')}`,
      revenue: row.revenue,
      orders: row.orders
    })),
    userGrowth: usersByMonth.map((row) => ({
      label: `${row._id.year}-${String(row._id.month).padStart(2, '0')}`,
      users: row.users
    }))
  };
};
