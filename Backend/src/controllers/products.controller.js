// Backend/src/controllers/products.controller.js
import ProductDAO from '../services/dao/product.dao.js';
import ProductDTO from '../services/dto/product.dto.js';
import logger from '../utils/logger.js';

const productDAO = new ProductDAO();

export const getAllProducts = async (req, res) => {
  try {
    const products = await productDAO.getAll();
    const productsDTO = products.map(product => new ProductDTO(product));
    res.json(productsDTO);
  } catch (error) {
    logger.error(`Error al obtener productos: ${error.message}`);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productDAO.getById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(new ProductDTO(product));
  } catch (error) {
    logger.error(`Error al obtener producto ${req.params.id}: ${error.message}`);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

// Backend/src/controllers/products.controller.js

export const createProduct = async (req, res) => {
  try {
    const { name, description, precio, stock, category } = req.body;

    // Validación obligatoria de categoría
    if (!category) {
      return res.status(400).json({ error: "La categoría es obligatoria" });
    }
    if (!['hombre', 'mujer'].includes(category.toLowerCase())) {
      return res.status(400).json({
        error: "Categoría inválida. Debe ser 'hombre' o 'mujer'"
      });
    }

    const imageUrl = req.file ? `/upload/${req.file.filename}` : '';

    const product = await productDAO.create({
      name,
      description,
      precio: Number(precio),
      stock: Number(stock),
      imageUrl,
      category: category.toLowerCase(), // guardamos siempre en minúscula
    });

    res.status(201).json(new ProductDTO(product));
  } catch (error) {
    logger.error(`Error al crear producto: ${error.message}`);
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, precio, stock, category } = req.body;
    const imageUrl = req.file ? `/upload/${req.file.filename}` : undefined;

    // Construimos solo los campos que vienen en el body
    const updateData = {
      ...(name && { name }),
      ...(description && { description }),
      ...(precio !== undefined && { precio: Number(precio) }),
      ...(stock !== undefined && { stock: Number(stock) }),
      ...(imageUrl && { imageUrl }),
    };

    // Si viene categoría, la validamos
    if (category !== undefined) {
      if (!['hombre', 'mujer'].includes(category.toLowerCase())) {
        return res.status(400).json({
          error: "Categoría inválida. Debe ser 'hombre' o 'mujer'"
        });
      }
      updateData.category = category.toLowerCase();
    }

    const updatedProduct = await productDAO.update(req.params.id, updateData);

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(new ProductDTO(updatedProduct));
  } catch (error) {
    logger.error(`Error al actualizar producto ${req.params.id}: ${error.message}`);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productDAO.delete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    logger.error(`Error al eliminar producto ${req.params.id}: ${error.message}`);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};