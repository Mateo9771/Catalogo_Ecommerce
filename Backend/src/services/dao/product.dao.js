// Backend/src/services/daos/product.dao.js
import Product from '../models/products.model.js';
import logger from '../../utils/logger.js';

class ProductDAO {
  async getAll() {
    try {
      return await Product.find();
    } catch (error) {
      logger.error(`Error en ProductDAO.getAll: ${error.message}`);
      throw error;
    }
  }

  async getById(id) {
    try {
      return await Product.findById(id);
    } catch (error) {
      logger.error(`Error en ProductDAO.getById(${id}): ${error.message}`);
      throw error;
    }
  }

  async create(productData) {
    try {
      return await Product.create(productData);
    } catch (error) {
      logger.error(`Error en ProductDAO.create: ${error.message}`);
      throw error;
    }
  }

  async update(id, productData) {
    try {
      return await Product.findByIdAndUpdate(id, productData, { new: true });
    } catch (error) {
      logger.error(`Error en ProductDAO.update(${id}): ${error.message}`);
      throw error;
    }
  }

  async delete(id) {
    try {
      return await Product.findByIdAndDelete(id);
    } catch (error) {
      logger.error(`Error en ProductDAO.delete(${id}): ${error.message}`);
      throw error;
    }
  }
}

export default ProductDAO;