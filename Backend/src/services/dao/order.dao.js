// Backend/src/services/daos/order.dao.js
import Order from '../models/orders.model.js';
import logger from '../../utils/logger.js';

class OrderDAO {
  async getAll() {
    try {
      return await Order.find().sort({ createdAt: -1 });
    } catch (error) {
      logger.error(`OrderDAO.getAll error: ${error.message}`);
      throw error;
    }
  }

  async getById(id) {
    try {
      return await Order.findById(id);
    } catch (error) {
      logger.error(`OrderDAO.getById(${id}) error: ${error.message}`);
      throw error;
    }
  }

  async create(orderData) {
    try {
      return await Order.create(orderData);
    } catch (error) {
      logger.error(`OrderDAO.create error: ${error.message}`);
      throw error;
    }
  }

  async update(id, updateData) {
    try {
      return await Order.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      logger.error(`OrderDAO.update(${id}) error: ${error.message}`);
      throw error;
    }
  }
}

export default new OrderDAO(); // singleton (como haces con los otros)