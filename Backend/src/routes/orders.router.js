import express from 'express';
import { createOrder, getAllOrders, confirmOrder, cancelOrder } from '../controllers/orders.controller.js';
import { passportCall, authorization } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', passportCall('jwt'), authorization('admin'), getAllOrders);
router.put('/:id/confirm', passportCall('jwt'), authorization('admin'), confirmOrder);
router.put('/:id/cancel', passportCall('jwt'), authorization('admin'), cancelOrder);

export default router;