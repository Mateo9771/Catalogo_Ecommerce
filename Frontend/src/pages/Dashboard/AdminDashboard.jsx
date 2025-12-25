import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPanel from "../../components/AdminPanel/AdminPanel";
import OrdersPanel from "../../components/OrdersPanel/OrdersPanel";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [validToken, setValidToken] = useState(false);
  const [activeTab, setActiveTab] = useState("products"); // pestaña activa

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin"); // redirigir si no hay token
    } else {
      setTimeout(() => {
        if (token === "mock-token-12345") {
          setValidToken(true);
        } else {
          localStorage.removeItem("token");
          navigate("/admin");
        }
      }, 800);
    }
  }, [navigate]);

  if (!validToken) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Verificando acceso...</p>
      </div>
    );
  }

  return (
      <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <h2>Admin</h2>
        <ul>
          <li
            className={activeTab === "products" ? "active" : ""}
            onClick={() => setActiveTab("products")}
          >
            Productos
          </li>
          <li
            className={activeTab === "sliders" ? "active" : ""}
            onClick={() => setActiveTab("sliders")}
          >
            Sliders
          </li>
          <li
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => setActiveTab("orders")}
          >
            Pedidos
          </li>
        </ul>
      </aside>
      <main className="dashboard-main">
        <h2 className="dashboard-title">Panel de Administración</h2>

        {activeTab === "products" && <AdminPanel type="products" />}
        {activeTab === "sliders" && <AdminPanel type="sliders" />}
        {activeTab === "orders" && <OrdersPanel />}
      </main>
    </div>
  );
};

export default AdminDashboard;
