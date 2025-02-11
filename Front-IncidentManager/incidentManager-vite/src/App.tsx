import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/* Importancion de paginas y componetes */
import LoginPage from './pages/PageLogin';
import Dashboard from './pages/Dashboard';
import PageUsers from './pages/PageUsers';
import PageReporte from './pages/PageReporte';
import PageDepartamento from './pages/PageDepart';
import PagePerfil from './pages/PagePerfil';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenExpiry = parseJwt(token).exp * 1000;
      if (Date.now() >= tokenExpiry) {
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
    <>
    <Router>
      <AppRoutes />
    </Router>
    </>
  )

  const AppRoutes: React.FC = () => {
    return (
      <>
      <Router>
     
           <Routes>
             <Route path="/login" element={<LoginPage />} />
             <Route path="/Dashboard" element={<Dashboard />} />
             <Route path="/Usuarios" element={<PageUsers />} />
             <Route path="/Reportes" element={<PageReporte />} />
             <Route path="/Departamento" element={<PageDepartamento />} />
             <Route path="/Perfil" element={<PagePerfil />} />
             <Route path="/" element={<LoginPage />} />
           </Routes>
        
       </Router>
       </>
  
    );
  };
}
const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export default App
