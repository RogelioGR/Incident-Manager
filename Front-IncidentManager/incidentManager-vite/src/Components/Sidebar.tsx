import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link , useNavigate } from 'react-router-dom';
import { logout } from '../Data/Services/AuthService';

interface SidebarProps {
  closeMenu?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({  closeMenu }) => {
  const navigate = useNavigate();

  const handleLogout = () => {

    logout();
    navigate('/login');
    if (closeMenu) {
      closeMenu();
    }
  };
  

  return (
    <Navbar variant="dark" className="sidebar-container">
      <Navbar.Brand className="sidebar-brand">
        <span className="sidebar-brand-text">SistemaReporte</span>
      </Navbar.Brand>

      <Nav className="flex-column w-100">
        <Nav.Link as={Link} to="/Dashboard" className="sidebar-link">
          <i className="fa-solid fa-house sidebar-icon me-2"></i>
          Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/PageReporte" className="sidebar-link">
          <i className="fas fa-file sidebar-icon me-2"></i>
          Reportes
        </Nav.Link>
        <Nav.Link as={Link} to="/ViewPerfil" className="sidebar-link">
          <i className="fa-solid fa-building me-2"></i>
          Departamentos
        </Nav.Link>
        <Nav.Link as={Link} to="/PageUsers" className="sidebar-link">
        <i className="fa-solid fa-user sidebar-icon me-2"></i>
        Usuarios
        </Nav.Link>
        <Nav.Link as={Link} to="/ViewPerfil" className="sidebar-link">
          <i className="fas fa-user-edit sidebar-icon me-2"></i>
          Perfil
        </Nav.Link>
      </Nav>

      <Nav className="flex-column mt-auto w-100">
        <Nav.Link onClick={handleLogout}  className="sidebar-link">
          <i className="fa-solid fa-power-off sidebar-icon me-2"></i>
          Cerrar sesión
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Sidebar;