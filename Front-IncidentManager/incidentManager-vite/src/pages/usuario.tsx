import React, { useState, useEffect } from 'react';
import { Table, Container, Form, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { obtenerUsuarios } from '../Data/Services/UsersServices'; // Función para obtener todos los usuarios
import { IUsuario } from '../Data/Interfaces/IUsers';

const Usuarios: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [users, setUsers] = useState<IUsuario[]>([]); // Inicializado como un array vacío
  const [searchTerm, setSearchTerm] = useState<string>(''); // Para filtrar usuarios por nombre o apellido

  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem('authenticated');
    if (authStatus !== 'true') {
      navigate("/login");
    } else {
      const fetchUsers = async () => {
        try {
          const usersData = await obtenerUsuarios(); // Obtener todos los usuarios desde la API
          setUsers(usersData || []); // Asegurarse de que los datos sean un array
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      fetchUsers();

      const handleResize = () => {
        if (window.innerWidth <= 768) {
          setUsersPerPage(6);
        } else {
          setUsersPerPage(5);
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [navigate]);

  // Filtrar usuarios según el término de búsqueda
  const filteredUsers = users.filter(user => {
    return `${user.nombre} ${user.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredUsersLength = filteredUsers.length;

  // Paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="my-3" style={{ overflowY: 'auto' }}>
      <h2 className="mb-4">Usuarios</h2>
      <div className="d-flex justify-content-between align-items-center">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <Form.Control
            type="text"
            placeholder="Buscar usuario"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ backgroundColor: '#E2E2E2' }}
          />
        </div>
      </div>
      <Table responsive striped bordered hover>
        <thead className="text-center">
          <tr>
            <th>Imagen</th>
            <th>Nombre completo</th>
            <th>Correo electrónico</th>
            <th className="d-none d-md-table-cell">Departamento</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user.idUsuarios}>
                <td className="align-middle text-center" style={{ width: '60px' }}>
                  <img src="/public/usuario.png" alt="user" className="rounded-circle" style={{ width: '50px' }} />
                </td>
                <td>{user.nombre} {user.apellidos}</td>
                <td>{user.correoElectronico}</td>
                <td className="d-none d-md-table-cell">{user.fkDepartamento}</td>
                <td>{user.fkRol}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">Sin usuarios en la lista</td>
            </tr>
          )}
        </tbody>
      </Table>
      {filteredUsersLength > 0 && (
        <Pagination className="justify-content-center">
          {[...Array(Math.ceil(filteredUsersLength / usersPerPage)).keys()].map(number => (
            <Pagination.Item key={number} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </Container>
  );
};

export default Usuarios;
