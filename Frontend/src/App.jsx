// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import AdminLogin from './pages/Login/AdminLogin';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import Whatsapp from './components/Buttons/Whatsapp/Whatsapp';
import { CartProvider } from './components/CartContext/CartContext';
import { AuthProvider, useAuth } from './components/Context/AuthContext.jsx'; // ← IMPORTANTE
import Cart from './pages/Cart/Cart';
import ProductListContainer from './components/ProductListContainer/ProductListContainer';

// Componente para proteger rutas de admin
const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container" style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Cargando sesión...</p>
      </div>
    );
  }

  return user?.role === 'admin' ? children : <Navigate to="/admin" replace />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <main style={{ minHeight: '80vh' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<AdminLogin />} />
              
              {/* RUTA PROTEGIDA */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                }
              />

              <Route path="/product" element={<ProductListContainer />} />
              <Route path="/cart" element={<Cart />} />

              {/* Ruta 404 opcional */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Whatsapp />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;