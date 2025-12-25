// Backend/src/services/dtos/order.dto.js
class OrderDTO {
  constructor(order) {
    this.id = order._id || order.id;
    this.orderId = order.orderId;                    // PED-2025-0001
    this.items = order.items.map(item => ({
      productId: item.productId,
      titulo: item.titulo,
      precio: item.precio,
      quantity: item.quantity,
      imagenUrl: item.imagenUrl || null
    }));
    this.total = order.total;
    this.customerMessage = order.customerMessage || null;
    this.status = order.status;
    this.createdAt = order.createdAt;
    this.confirmedAt = order.confirmedAt || null;
    this.notes = order.notes || null;
  }
}

export default OrderDTO;