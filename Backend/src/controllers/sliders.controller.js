// Backend/src/controllers/sliders.controller.js
import SliderDAO from '../services/dao/slider.dao.js';
import SliderDTO from '../services/dto/slider.dto.js';
import logger from '../utils/logger.js';

const sliderDAO = new SliderDAO();

export const getAllSliders = async (req, res) => {
  try {
    const sliders = await sliderDAO.getAll();
    const slidersDTO = sliders.map(slider => new SliderDTO(slider));
    res.json(slidersDTO);
  } catch (error) {
    logger.error(`Error al obtener sliders: ${error.message}`);
    res.status(500).json({ error: 'Error al obtener sliders' });
  }
};

export const getSliderById = async (req, res) => {
  try {
    const slider = await sliderDAO.getById(req.params.id);
    if (!slider) return res.status(404).json({ error: 'Slider no encontrado' });
    res.json(new SliderDTO(slider));
  } catch (error) {
    logger.error(`Error al obtener slider ${req.params.id}: ${error.message}`);
    res.status(500).json({ error: 'Error al obtener slider' });
  }
};

export const createSlider = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file ? `/upload/${req.file.filename}` : '';
    const slider = await sliderDAO.create({ title, description, imageUrl });
    res.status(201).json(new SliderDTO(slider));
  } catch (error) {
    logger.error(`Error al crear slider: ${error.message}`);
    res.status(500).json({ error: 'Error al crear slider' });
  }
};

export const updateSlider = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file ? `/upload/${req.file.filename}` : undefined;
    const updatedSlider = await sliderDAO.update(req.params.id, { title, description, imageUrl });
    if (!updatedSlider) return res.status(404).json({ error: 'Slider no encontrado' });
    res.json(new SliderDTO(updatedSlider));
  } catch (error) {
    logger.error(`Error al actualizar slider ${req.params.id}: ${error.message}`);
    res.status(500).json({ error: 'Error al actualizar slider' });
  }
};

export const deleteSlider = async (req, res) => {
  try {
    const deletedSlider = await sliderDAO.delete(req.params.id);
    if (!deletedSlider) return res.status(404).json({ error: 'Slider no encontrado' });
    res.json({ message: 'Slider eliminado' });
  } catch (error) {
    logger.error(`Error al eliminar slider ${req.params.id}: ${error.message}`);
    res.status(500).json({ error: 'Error al eliminar slider' });
  }
};