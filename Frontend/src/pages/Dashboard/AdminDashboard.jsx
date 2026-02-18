import { useState } from "react";
import AdminPanel from "../../components/AdminPanel/AdminPanel";
import OrdersPanel from "../../components/OrdersPanel/OrdersPanel";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products"); // pestaña activa

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
