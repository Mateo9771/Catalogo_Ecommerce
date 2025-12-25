import { Router } from "express"
import { getAllSliders, getSliderById, createSlider, updateSlider, deleteSlider } from "../controllers/sliders.controller.js"
import { passportCall, authorization } from "../middlewares/auth.js"
import multer from "multer";

const router = Router();
const upload = multer({ dest: 'upload/' });

// Obtener todos los sliders (público)
router.get('/', getAllSliders);

// Obtener un slider por ID (público)
router.get('/:id', getSliderById);

// Crear un slider (solo admin)
router.post('/', passportCall('jwt'), authorization('admin'), upload.single('image'), createSlider);

// Actualizar un slider (solo admin)
router.put('/:id', passportCall('jwt'), authorization('admin'), upload.single('image'), updateSlider);

// Eliminar un slider (solo admin)
router.delete('/:id', passportCall('jwt'), authorization('admin'), deleteSlider);

export default router;