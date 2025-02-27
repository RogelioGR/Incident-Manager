import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import { obtenerUsuarioid } from '../Data/Services/UsersServices';
import { IUsuario } from '../Data/Interfaces/IUsers';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<IUsuario | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const id = localStorage.getItem('idUsuarios');
      if (id) {
        const idUsuarios = parseInt(id, 10);
        const userData = await obtenerUsuarioid(idUsuarios);
        setUser(userData);
      }
    };
    fetchUser();
  }, []);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const handleLogout = () => {
    localStorage.removeItem('token');
  };
  
  
  return (
    <header className="d-flex justify-content-between align-items-center p-2 border-bottom">
      <div className="menu-toggle-btn d-lg-none">
        <button className="btn btn-link" onClick={toggleMenu}>
          <i className="fa fa-bars"></i>
        </button>
      </div>
      {user && (
        <div className="user-info d-flex align-items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/12/User_icon_2.svg"
            alt="avatar"
            className="rounded-circle"
            style={{ width: '40px', height: '40px' }}
          />
          <div className="ms-2">
            <span className="fw-bold">{user.nombre} {user.apellidos}</span>
            <br />
            <span className="text-muted">{user.correoElectronico}</span>
          </div>
        </div>
      )}
      <div className="dropdown">
        <button
          className="btn btn-light dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
        </button>
        <ul className="dropdown-menu dropdown-menu-end " aria-labelledby="dropdownMenuButton">
          <li>
            <Link className="dropdown-item" to="/login" onClick={handleLogout}>
              <i className="fa-solid fa-power-off me-2"></i>
              Cerrar sesión
            </Link>
          </li>
        </ul>
      </div>
      {menuOpen && <Sidebar mobile closeMenu={closeMenu} />}
    </header>
  );
};

export default Header;
