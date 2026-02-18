// src/components/OrdersPanel/OrdersPanel.jsx
import { useState, useEffect } from "react";
import api from "../../api/axios.api.jsx";
import DeleteButton from "../Buttons/CrudButtons/DeleteButton.jsx";
import SaveButton from "../Buttons/CrudButtons/SaveButton.jsx";
import ActionButtonsGroup from "../Buttons/CrudButtons/ActionButtonsGroup.jsx";
import "./OrdersPanel.css";

const statusColors = {
  pendiente: "#f59e0b",
  pagado: "#10b981",
  enviado: "#3b82f6",
  completado: "#6366f1",
  cancelado: "#ef4444",
  rechazado: "#dc2626"
};

const OrdersPanel = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      alert("Error al cargar pedidos");
    } finally {
      setLoading(false);
    }
  };

const confirmOrder = async (id) => {
  if (!window.confirm("¿Confirmar pago y descontar stock?")) return;
  
  try {
    await api.put(`/orders/${id}/confirm`);  // ← así está bien si tu backend lo acepta
    alert("¡Pedido confirmado y stock descontado!");
    fetchOrders();
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.error || "Error al confirmar el pedido");
  }
};

  const cancelOrder = async (id) => {
    if (!window.confirm("¿Cancelar este pedido?")) return;
    try {
      await api.put(`/orders/${id}/cancel`);
      alert("Pedido cancelado");
      fetchOrders();
    } catch (err) {
      alert("Error al cancelar");
    }
  };

  const filteredOrders = filter === "todos"
    ? orders
    : orders.filter(o => o.status === filter);

  if (loading) return <p className="text-center py-10">Cargando pedidos...</p>;

  return (
    <div className="orders-panel">
      <h2 className="text-3xl font-bold mb-6">Gestión de Pedidos</h2>

      {/* FILTROS */}
      <div className="filters mb-6">
        <button onClick={() => setFilter("todos")} className={filter === "todos" ? "active" : ""}>
          Todos ({orders.length})
        </button>
        <button onClick={() => setFilter("pendiente")} className={filter === "pendiente" ? "active" : ""}>
          Pendientes ({orders.filter(o => o.status === "pendiente").length})
        </button>
        <button onClick={() => setFilter("pagado")} className={filter === "pagado" ? "active" : ""}>
          Pagados ({orders.filter(o => o.status === "pagado").length})
        </button>
      </div>

      {/* TABLA DE PEDIDOS */}
      <div className="orders-table">
        {filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No hay pedidos {filter !== "todos" ? filter : ""}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Fecha</th>
                <th>Items</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong>{order.orderId}</strong>
                    <br />
                    <small className="text-gray-500">
                      {new Date(order.createdAt).toLocaleString("es-AR")}
                    </small>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString("es-AR")}</td>
                  <td>
                    {order.items.length} producto{order.items.length > 1 ? "s" : ""}
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="detail-button text-blue-600 text-sm ml-2 underline"
                    >
                      ver detalle
                    </button>
                  </td>
                  <td><strong>${order.total}</strong></td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: statusColors[order.status] || "#666" }}
                    >
                      {order.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <ActionButtonsGroup>
                      {order.status === "pendiente" && (
                        <>
                          <button
                            onClick={() => confirmOrder(order.id)}
                            className="confirm-btn"
                            title="Confirmar pago"
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => cancelOrder(order.id)}
                            className="cancel-btn-small"
                            title="Cancelar pedido"
                          >
                            Cancelar
                          </button>
                        </>
                      )}
                      {order.status === "pagado" && (
                        <span className="text-green-600 text-sm">Stock descontado</span>
                      )}
                    </ActionButtonsGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL DETALLE DEL PEDIDO */}
      {selectedOrder && (
        <div className="modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Detalle del Pedido {selectedOrder.orderId}</h3>
            <p><strong>Estado:</strong> <span style={{ color: statusColors[selectedOrder.status] }}>
              {selectedOrder.status.toUpperCase()}
            </span></p>
            <p><strong>Fecha:</strong> {new Date(selectedOrder.createdAt).toLocaleString("es-AR")}</p>
            {selectedOrder.customerMessage && (
              <p><strong>Mensaje del cliente:</strong> {selectedOrder.customerMessage}</p>
            )}

            <div className="order-items">
              {selectedOrder.items.map((item, i) => (
                <div key={i} className="order-item">
                  {item.imagenUrl && (
                    <img src={`http://localhost:3000${item.imagenUrl}`} alt={item.titulo} />
                  )}
                  <div>
                    <strong>{item.titulo}</strong><br />
                    Cantidad: {item.quantity} × ${item.precio} = ${item.quantity * item.precio}
                  </div>
                </div>
              ))}
            </div>

            <div className="total-final">
              <strong>TOTAL: ${selectedOrder.total}</strong>
            </div>

            <button onClick={() => setSelectedOrder(null)} className="close-modal">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPanel;