import About from '../models/about.model.js';
import logger from '../../utils/logger.js';

class AboutDAO {
  async get() {
    try {
      const about = await About.findOne();
      return about;
    } catch (error) {
      logger.error(`Error en AboutDAO.get: ${error.message}`);
      throw error;
    }
  }

  async update(id, data) {
    try {
      return await About.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      logger.error(`Error en AboutDAO.update: ${error.message}`);
      throw error;
    }
  }
}

export default AboutDAO;