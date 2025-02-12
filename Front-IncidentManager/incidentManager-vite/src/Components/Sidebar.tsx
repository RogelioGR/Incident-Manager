import React from 'react';
import { Navbar, Nav, Offcanvas } from 'react-bootstrap';
import { Link , useNavigate } from 'react-router-dom';
import { logout } from '../Data/Services/AuthService';

interface SidebarProps {
  mobile?: boolean;
  closeMenu?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({mobile = false,  closeMenu }) => {
  const navigate = useNavigate();

  const handleLogout = () => {

    logout();
    navigate('/login');
    if (closeMenu) {
      closeMenu();
    }
  };
  
  return (
    <>
    {mobile ? (
       <Offcanvas show className="sidebar-container sidebar-mobile" style={{ width: '250px' }} onHide={closeMenu}>
       <Offcanvas.Header   >
         <Offcanvas.Title className="sidebar-brand">
           <span className="sidebar-brand-text ">Incident Manager</span>
         </Offcanvas.Title>
       </Offcanvas.Header>
       <Offcanvas.Body className="d-flex flex-column">
         <Nav className="flex-column w-100 flex-grow-1">
           <Nav.Link as={Link} to="/Dashboard" className="sidebar-link">
             <i className="fa-solid fa-house sidebar-icon me-2"></i>
             Dashboard
           </Nav.Link>
           <Nav.Link as={Link} to="/ViewPerfil" onClick={closeMenu} className="sidebar-link">
             <i className="fa-solid fa-user sidebar-icon me-2"></i>
             Perfil
           </Nav.Link>
           <Nav.Link as={Link} to="/Viewinform" onClick={closeMenu} className="sidebar-link">
             <i className="fa-solid fa-circle-info sidebar-icon me-2"></i>
             Info
           </Nav.Link>
         </Nav>
         <Nav className="mt-auto flex-column logout-section">
           <Nav.Link onClick={handleLogout} className="sidebar-link text-white text-center">
             <i className="fa-solid fa-power-off me-2"></i>
             Cerrar Sesión
           </Nav.Link>
         </Nav>
       </Offcanvas.Body>
     </Offcanvas>

    ):(

    <Navbar variant="dark" className="sidebar-container sidebar-desktop d-none d-lg-flex">
      <Navbar.Brand className="sidebar-brand">
        <span className="sidebar-brand-text">Incident Manager</span>
      </Navbar.Brand>

      <Nav className="flex-column w-100">
        <Nav.Link as={Link} to="/Dashboard" className="sidebar-link">
          <i className="fa-solid fa-house sidebar-icon me-2"></i>
          Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/Reportes" className="sidebar-link">
          <i className="fas fa-file sidebar-icon me-2"></i>
          Reportes
        </Nav.Link>
        <Nav.Link as={Link} to="/Departamento" className="sidebar-link">
          <i className="fa-solid fa-building me-2"></i>
          Departamentos
        </Nav.Link>
        <Nav.Link as={Link} to="/Usuarios" className="sidebar-link">
        <i className="fa-solid fa-user sidebar-icon me-2"></i>
        Usuarios
        </Nav.Link>
        <Nav.Link as={Link} to="/Perfil" className="sidebar-link">
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
    )}
    </>
  );
};

export default Sidebar;