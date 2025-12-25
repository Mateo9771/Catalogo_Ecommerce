// AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/Context/AuthContext"; // Ajusta ruta
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(email, password);

    if (result.success) {
      navigate("/admin/dashboard");
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Panel de Administración</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              placeholder="admin@demo.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              placeholder="123456"
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Iniciando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;