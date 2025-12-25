import { Router } from "express";
import {register, failRegister, login, logout, getCurrent } from "../controllers/session.controller.js";
import { passportCall } from "../middlewares/auth.js";

const router = Router();

// Ruta de registro
router.post('/register', register);

// Ruta de fallo en el registro
router.get('/failregister', failRegister);

// Ruta para obtener el usuario actual
router.get('/current', passportCall('jwt'), getCurrent);

// Ruta de login
router.post('/login', login);

// Ruta de logout
router.post('/logout', logout);

export default router;