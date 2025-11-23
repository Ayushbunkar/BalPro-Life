import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

// @desc    Get aggregated metrics for admin dashboard
// @route   GET /api/admin/metrics
// @access  Private/Admin
export const getMetrics = async (req, res) => {
  try {
    // Total counts
    const [usersCount, productsCount, ordersCount] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments()
    ]);

    // Total revenue across all orders
    const revenueAgg = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: { $ifNull: [ '$total', '$totalPrice' ] } } } }
    ]);
    const totalRevenue = (revenueAgg[0] && revenueAgg[0].totalRevenue) || 0;

    // Recent orders (latest 8)
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort('-createdAt')
      .limit(8)
      .lean();

    // Orders per day for last 14 days (for chart)
    const days = 14;
    const since = new Date();
    since.setDate(since.getDate() - (days - 1));

    const ordersByDay = await Order.aggregate([
      { $match: { createdAt: { $gte: since } } },
      { $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          day: { $dayOfMonth: '$createdAt' }
        },
        count: { $sum: 1 },
        revenue: { $sum: { $ifNull: [ '$total', '$totalPrice' ] } }
      } },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    // normalize to an array of dates with counts
    const dayMap = {};
    for (const row of ordersByDay) {
      const { year, month, day } = row._id;
      const d = new Date(year, month - 1, day);
      dayMap[d.toISOString().slice(0,10)] = { count: row.count, revenue: row.revenue };
    }

    const series = [];
    for (let i = 0; i < days; i++) {
      const d = new Date(since);
      d.setDate(since.getDate() + i);
      const key = d.toISOString().slice(0,10);
      series.push({ date: key, count: dayMap[key]?.count || 0, revenue: dayMap[key]?.revenue || 0 });
    }

    res.status(200).json({
      success: true,
      data: {
        usersCount,
        productsCount,
        ordersCount,
        totalRevenue,
        recentOrders,
        ordersSeries: series
      }
    });
  } catch (error) {
    console.error('Get metrics error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export default { getMetrics };
