import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';

/* Importación de páginas y componentes */
 import LoginPage from './pages/PageLogin';
import Dashboard from './pages/Dashboard';
import PageUsers from './pages/PageUsers';
import PageReporte from './pages/PageReporte';
import PageDepartamento from './pages/PageDepart';
import PagePerfil from './pages/PagePerfil';
/* import Dashboardprueba from './pages/newlogin';
 */const App: React.FC = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenExpiry = parseJwt(token)?.exp * 1000;
      if (tokenExpiry && Date.now() >= tokenExpiry) {
        logoutUser();
      }
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('userId');
    localStorage.removeItem('authenticated');
    localStorage.removeItem('_grecaptcha');
  };

  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usuarios" element={<PageUsers />} />
          <Route path="/reportes" element={<PageReporte />} />
          <Route path="/departamento" element={<PageDepartamento />} />
          <Route path="/perfil" element={<PagePerfil />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error("Error al decodificar el token:", e);

    return null;
  }
};

export default App;
