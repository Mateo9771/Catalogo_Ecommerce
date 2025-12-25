import express from 'express';
import {getUsers ,getUserById, createUser, updateUser, deleteUser} from '../controllers/users.controller.js';
import { passportCall, authorization } from '../middlewares/auth.js';

const router = express.Router();

//Obtener todos los usuarios - Admin
router.get('/', passportCall('jwt'), authorization('admin'), getUsers);

//Obtener Usuario por ID - Admin
router.get('/:id', passportCall('jwt'), authorization('admin'), getUserById);

//Crear nuevo usuario - Admin
router.post('/', passportCall('jwt'), authorization('admin'), createUser);

//Actualizar usuario por ID - Admin
router.put('/:id', passportCall('jwt'), authorization('admin'), updateUser);

//Eliminar usuario por ID - Admin
router.delete('/:id', passportCall('jwt'), authorization('admin'), deleteUser);

export default router;