import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { obtenerUsuarioid } from '../Data/Services/UsersServices';
import { IUsuario } from '../Data/Interfaces/IUsers';

const Header : React.FC = () => {
  const [user, setUser] = useState<IUsuario | null>(null);

  useEffect(() =>{
    const fetchUser = async () => {
      try {
          const id = localStorage.getItem('idUsuarios');
          if (id) {
              const  idUsuarios = parseInt(id, 10); 
              const userData = await obtenerUsuarioid( idUsuarios);
              setUser(userData);
          }
      } catch (error) {
          console.error('Error al cargar la información del usuario', error);
      }
  };
  fetchUser();
  }, []);
  return (
    <header className="d-flex justify-content-between align-items-center p-2 border-bottom">
      <div className="user-info d-flex align-items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/12/User_icon_2.svg"
          alt="avatar"
          className="rounded-circle"
          style={{
            width:'40px',
            height: '40px'
            }}
        />
        <div className="ms-2">
          <span className="fw-bold">{user?.nombre}</span>
          <br />
          <span className="text-muted">{user?.correoElectronico}</span>
        </div>
        <div className="dropdown ms-4">
          <button
            className="btn btn-link dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
            <li> <Link className="dropdown-item"  to="/login">
            <i className="fa-solid fa-power-off me-2"></i>
           Cerrar sesión
            </Link></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;