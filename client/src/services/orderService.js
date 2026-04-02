import { ordersAPI } from '../utils/api';

export const orderService = {
  getOrders: (params) => ordersAPI.getAllOrders(params),
  getOrder: (id) => ordersAPI.getOrder(id),
  updateOrderStatus: (id, payload) => ordersAPI.updateOrderStatus(id, payload)
};

export default orderService;
