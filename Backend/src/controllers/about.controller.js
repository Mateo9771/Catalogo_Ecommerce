import AboutDAO from '../services/dao/about.dao.js';
import AboutDTO from '../services/dto/about.dto.js';
import logger from '../utils/logger.js';

const aboutDAO = new AboutDAO();

export const getAbout = async (req, res) => {
  try {
    const about = await aboutDAO.get();
    if (!about) return res.status(404).json({ error: 'Contenido no encontrado' });
    res.json(new AboutDTO(about));
  } catch (error) {
    logger.error(`Error al obtener About: ${error.message}`);
    res.status(500).json({ error: 'Error interno' });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const { title, description } = req.body;
    const about = await aboutDAO.get();
    if (!about) return res.status(404).json({ error: 'Contenido no encontrado' });

    const updated = await aboutDAO.update(about._id, { title, description });
    res.json(new AboutDTO(updated));
  } catch (error) {
    logger.error(`Error al actualizar About: ${error.message}`);
    res.status(500).json({ error: 'Error interno' });
  }
};