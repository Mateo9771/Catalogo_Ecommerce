// src/pages/Cart/Cart.jsx
import { useCart } from "../../components/CartContext/CartContext";
import api from "../../api/axios.api"; // ← AXIOS
import { useState } from "react";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [isSending, setIsSending] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);

  // Generar mensaje para WhatsApp
  const generateWhatsAppMessage = (orderId) => {
    let message = "¡Hola! Acabo de hacer un pedido en tu tienda 🧾\n\n";
    message += "*Resumen del pedido*\n";
    message += "━━━━━━━━━━━━━━━━━━━━\n";
    
    cart.forEach((item) => {
      message += `• *${item.titulo}*\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      message += `   Precio: $${item.precio} c/u\n`;
      message += `   Subtotal: $${item.precio * item.quantity}\n`;
      message += "━━━━━━━━━━━━━━━━━━━━\n";
    });

    message += `*TOTAL: $${total}*\n\n`;
    message += `*Número de pedido:* ${orderId}\n\n`;
    message += "¡Gracias! Espero tu confirmación ";

    return encodeURIComponent(message);
  };

  // ENVIAR PEDIDO + CREAR EN BASE DE DATOS
  const handleCheckout = async () => {
    if (isSending) return;
    setIsSending(true);

    try {
      // 1. Crear pedido en el backend
      const response = await api.post("/orders", {
        items: cart.map(item => ({
          productId: item._id,
          titulo: item.titulo,
          precio: item.precio,
          quantity: item.quantity,
          imagenUrl: item.imagenUrl.replace("http://localhost:3000", "") // solo ruta
        })),
        total,
        customerMessage: "Pedido enviado desde la web"
      });

      const orderId = response.data.orderId;

      // 2. Abrir WhatsApp con el número de pedido
      const whatsappNumber = "541169488320"; // TU NÚMERO
      const whatsappMessage = generateWhatsAppMessage(orderId);
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

      // 3. Vaciar carrito
      clearCart();

      // 4. Abrir WhatsApp y mostrar éxito
      window.open(whatsappLink, "_blank");
      alert(`¡Pedido ${orderId} creado con éxito! Se abrió WhatsApp`);
      
    } catch (err) {
      console.error(err);
      alert("Error al crear el pedido. Intenta de nuevo.");
    } finally {
      setIsSending(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <p>El carrito está vacío</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item._id} className="cart-item">
            <img src={item.imagenUrl} alt={item.titulo} />
            <div>
              <h4>{item.titulo}</h4>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio: ${item.precio * item.quantity}</p>
              <button onClick={() => removeFromCart(item._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      <h3>Total: ${total}</h3>

      <div className="cart-actions">
        <button className="clear-btn" onClick={clearCart}>
          Vaciar carrito
        </button>

        <button
          onClick={handleCheckout}
          disabled={isSending}
          className="whatsapp-btn"
        >
          {isSending ? "Creando pedido..." : "Enviar pedido por WhatsApp"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
