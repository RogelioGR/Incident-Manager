import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { parseJwt } from './Data/Services/jwt';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


/* Importación de páginas y componentes */
import LoginPage from './pages/PageLogin';
import Dashboard from './pages/Dashboard';
import PageUsers from './pages/PageUsers';
import PageReporte from './pages/PageReporte';
import PageDepartamento from './pages/PageDepart';
import PagePerfil from './pages/PagePerfil';
import DashboardEmpleado from './pages/DashboardEmpl';
import DashboardLideres from './pages/DashboardLid';
import PageViewReports from './pages/PageViewReports';
import Monitoring from './pages/pageMonitoring';
import PageDepartmentLideres from './pages/PageDepartmentsLds';

const MySwal = withReactContent(Swal);

const App: React.FC = () => {

  useEffect(() => {

    const token = localStorage.getItem('token');
  
    if (token) {
      const tokenExpiry = parseJwt(token)?.exp * 1000;
      if (tokenExpiry && Date.now() >= tokenExpiry) {
        console.log("Token expirado, cerrando sesión...");
        logoutUser();
      } else {
        console.log("Token válido");
      }
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('fkRol');
    localStorage.removeItem('idUsuarios');
    localStorage.removeItem('authenticated');
    MySwal.fire({
      title: 'Sesión expirada',
      text: 'Por favor, inicia sesión nuevamente.',
      icon: 'error',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/login';
      }
    });
  };

  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<LoginPage />} />


        {/* Rutas protegidas por rol de usuario*/}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<RoleBasedRoute roles={[1]}><Dashboard /></RoleBasedRoute>} />
          <Route path="/dashboardE" element={<RoleBasedRoute roles={[3]}><DashboardEmpleado /></RoleBasedRoute>} />
          <Route path="/dashboardL" element={<RoleBasedRoute roles={[2]}><DashboardLideres /></RoleBasedRoute>} />

          {/* Rutas compartidas */}
          <Route path="/perfil" element={<PagePerfil />} />
          <Route path="/reportes" element={<PageReporte />} />
          <Route path="/vistaReporte/:idReporte" element={<PageViewReports />} />
          
          <Route path="/Monitoreo" element={<RoleBasedRoute roles={[1]}><Monitoring/></RoleBasedRoute>} />
          <Route path="/DepartamentoL" element={<RoleBasedRoute roles={[2]}><PageDepartmentLideres/></RoleBasedRoute>} />

          <Route path="/usuarios" element={<RoleBasedRoute roles={[1, 2]}><PageUsers /></RoleBasedRoute>} />
          <Route path="/departamento" element={<RoleBasedRoute roles={[1, 2]}><PageDepartamento /></RoleBasedRoute>} />
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

const RoleBasedRoute: React.FC<{ roles: number[], children: React.ReactNode }> = ({ roles, children }) => {
  const fkRol = parseInt(localStorage.getItem('fkRol') || '0', 10);
  return roles.includes(fkRol) ? <>{children}</> : <Navigate to="/login" replace />;
};

export default App;
