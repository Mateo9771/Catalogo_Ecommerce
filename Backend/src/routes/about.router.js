import { Router } from 'express';
import { getAbout, updateAbout } from '../controllers/about.controller.js';
import { passportCall, authorization } from '../middlewares/auth.js';

const router = Router();

// Público
router.get('/', getAbout);

// Solo admin
router.put('/', passportCall('jwt'), authorization('admin'), updateAbout);

export default router;