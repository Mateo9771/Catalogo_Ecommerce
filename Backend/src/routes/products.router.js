import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';
import { passportCall, authorization } from '../middlewares/auth.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'upload/' });

// Obtener todos los productos
router.get('/', getAllProducts);

// Obtener un producto por ID
router.get('/:id', getProductById);

// Crear un nuevo producto (solo para administradores)
router.post('/', passportCall('jwt'), authorization('admin'), upload.single('image'), createProduct);

// Actualizar un producto por ID (solo para administradores)
router.put('/:id', passportCall('jwt'), authorization('admin'), upload.single('image'), updateProduct);

// Eliminar un producto por ID (solo para administradores)
router.delete('/:id', passportCall('jwt'), authorization('admin'), deleteProduct);

export default router;

