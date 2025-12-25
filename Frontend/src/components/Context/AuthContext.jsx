// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "../../api/axios.api"; // Ajusta la ruta si es necesario

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario al iniciar (persistir sesión)
  useEffect(() => {
    const loadUser = async () => {
      const savedUser = localStorage.getItem("adminUser");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  // Login con tu API
  const login = async (email, password) => {
    try {
      const response = await api.post('/sessions/login', { email, password });
      const { role, email: userEmail } = response.data;

      if (role !== 'admin') {
        return { success: false, error: "Acceso denegado. Solo administradores." };
      }

      const adminUser = { email: userEmail, role };
      setUser(adminUser);
      localStorage.setItem("adminUser", JSON.stringify(adminUser));
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Error en la autenticación.";
      return { success: false, error: msg };
    }
  };

  // Cerrar sesión
  const logout = async () => {
    try {
      await api.post('/sessions/logout'); // Opcional: si tienes endpoint
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    } finally {
      setUser(null);
      localStorage.removeItem("adminUser");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};