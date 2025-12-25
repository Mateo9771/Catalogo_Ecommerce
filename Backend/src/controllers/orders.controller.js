// Backend/src/controllers/orders.controller.js
import OrderDAO from '../services/dao/order.dao.js';
import Product from '../services/models/products.model.js';
import OrderDTO from '../services/dto/order.dto.js';
import logger from '../utils/logger.js';

export const createOrder = async (req, res) => {
  try {
    const { items, total, customerMessage } = req.body;

    const order = await OrderDAO.create({
      items,
      total,
      customerMessage,
      status: 'pendiente'
    });

    res.status(201).json({
      success: true,
      orderId: order.orderId,
      message: "Pedido recibido. ¡Te contactamos en breve por WhatsApp!"
    });
  } catch (error) {
    logger.error(`createOrder error: ${error.message}`);
    res.status(500).json({ error: "Error al crear el pedido" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderDAO.getAll();
    const ordersDTO = orders.map(order => new OrderDTO(order));
    res.json(ordersDTO);
  } catch (error) {
    logger.error(`getAllOrders error: ${error.message}`);
    res.status(500).json({ error: "Error al obtener pedidos" });
  }
};

export const confirmOrder = async (req, res) => {
  try {
    const order = await OrderDAO.getById(req.params.id);
    if (!order) return res.status(404).json({ error: "Pedido no encontrado" });

    if (order.status !== 'pendiente') {
      return res.status(400).json({ error: "El pedido ya fue procesado" });
    }

    // === Descontar stock ===
    for (const item of order.items) {
      const product = await Product.findById(item.productId);
      if (!product) throw new Error(`Producto no encontrado: ${item.titulo}`);
      if (product.stock < item.quantity) {
        throw new Error(`Stock insuficiente: ${item.titulo}`);
      }
      product.stock -= item.quantity;
      await product.save();
    }

    await OrderDAO.update(req.params.id, {
      status: 'pagado',
      confirmedAt: new Date()
    });

    res.json({ success: true, message: "Pedido confirmado y stock actualizado" });
  } catch (error) {
    logger.error(`confirmOrder error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await OrderDAO.getById(req.params.id);
    if (!order) return res.status(404).json({ error: "Pedido no encontrado" });

    if (order.status === 'pagado') {
      for (const item of order.items) {
        const product = await Product.findById(item.productId);
        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }
    }

    await OrderDAO.update(req.params.id, { status: 'cancelado' });

    res.json({ success: true, message: "Pedido cancelado" });
  } catch (error) {
    logger.error(`cancelOrder error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};