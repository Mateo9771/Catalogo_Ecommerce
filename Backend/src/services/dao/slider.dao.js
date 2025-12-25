// Backend/src/services/daos/slider.dao.js
import Slider from '../models/sliders.model.js';
import logger from '../../utils/logger.js';

class SliderDAO {
  async getAll() {
    try {
      return await Slider.find();
    } catch (error) {
      logger.error(`Error en SliderDAO.getAll: ${error.message}`);
      throw error;
    }
  }

  async getById(id) {
    try {
      return await Slider.findById(id);
    } catch (error) {
      logger.error(`Error en SliderDAO.getById(${id}): ${error.message}`);
      throw error;
    }
  }

  async create(sliderData) {
    try {
      return await Slider.create(sliderData);
    } catch (error) {
      logger.error(`Error en SliderDAO.create: ${error.message}`);
      throw error;
    }
  }

  async update(id, sliderData) {
    try {
      return await Slider.findByIdAndUpdate(id, sliderData, { new: true });
    } catch (error) {
      logger.error(`Error en SliderDAO.update(${id}): ${error.message}`);
      throw error;
    }
  }

  async delete(id) {
    try {
      return await Slider.findByIdAndDelete(id);
    } catch (error) {
      logger.error(`Error en SliderDAO.delete(${id}): ${error.message}`);
      throw error;
    }
  }
}

export default SliderDAO;