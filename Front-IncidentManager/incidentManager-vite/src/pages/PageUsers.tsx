import React, { useEffect, useState } from 'react';
import { Container, Table, Alert, Button } from 'react-bootstrap';
import { obtenerUsuarios } from '../Data/Services/UsersServices';
import { IUsuario } from '../Data/Interfaces/IUsers';
import MCreateUser from '../Components/Modals/Users/McreateUsers';
import MViewUser from '../Components/Modals/Users/MviewUsers';
import MDeleteUser from '../Components/Modals/Users/MdropUsers';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const PageUsers: React.FC = () => {
    const [users, setUsers] = useState<IUsuario[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const usersData = await obtenerUsuarios();
                setUsers(usersData);
                setError(null);
            } catch (error) {
                setError('Error al cargar los usuarios');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = Array.isArray(users) ? users.filter(user =>
        user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.apellidos?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.correoElectronico.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];
    enum ModalsUsers {
        NONE = 'NONE',
        CREATE_USER = 'CREATE_USER',
        EDIT_USER = 'EDIT_USER',
        DELETE_USER = 'DELETE_USER',
        VIEW_USER = 'VIEW_USER',
      }
    
      const [modalUsers, setModalUsers] = useState(ModalsUsers.NONE);
      const [selectedUserId, setSelectedUserId] = useState<number>();
    
      const handleCloseModal = () => setModalUsers(ModalsUsers.NONE);
    
      const handleOpenModal = (type: ModalsUsers, IdUsuario?: number) => {
        setModalUsers(type);
        setSelectedUserId(IdUsuario);
      };
   
    return (
        <>
            <div className="d-flex vh-100 flex-column flex-md-row viewinform-container">
                <Sidebar />
                <div className="flex-grow-1 d-flex flex-column viewinform-content">
                    <Header />
                    <Container className="my-3" style={{ overflowY: 'auto' }}>
                        <div className="container mt-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h1 className="reports-title">Usuarios</h1>
                                <div className="d-flex align-items-center search-container">
                                    <input
                                        type="text"
                                        className="form-control search-input"
                                        placeholder="Buscar Usuarios"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button className="btn btn-success mb-4" onClick={() => handleOpenModal(ModalsUsers.CREATE_USER)} 
                            >Crear usuario</button>
                            <div>
                                {error && (
                                    <Alert variant="danger" className="text-center">
                                        {error}
                                    </Alert>
                                )}

                                {isLoading ? (
                                    <div className="text-center">
                                        <p>Cargando usuarios...</p>
                                    </div>
                                ) : filteredUsers.length === 0 ? (
                                    <div className="text-center my-4">
                                        <p style={{ color: '#9E9E9E', fontSize: '1.2rem' }}>
                                            {searchTerm ? 'No se encontraron usuarios con ese criterio de búsqueda' : 'Sin usuarios registrados'}
                                        </p>
                                    </div>
                                ) : (
                                    <Table responsive striped bordered hover>
                                        <thead className="text-center">
                                            <tr>
                                                <th>#</th>
                                                <th>Nombre completo</th>
                                                <th>Departamento</th>
                                                <th>Correo Electrónico</th>
                                                <th>Correo Personal</th>
                                                <th>accion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredUsers.map((usuario) => (
                                                <tr key={usuario.idUsuarios}>
                                                    <td>{usuario.idUsuarios}</td>
                                                    <td >{usuario.apellidos} {usuario.nombre}</td>
                                                    <td>{usuario.fkDepartamento}</td>
                                                    <td>{usuario.correoElectronico}</td>
                                                    <td>{usuario.correoPersonal}</td>
                                                    <td>
                                                        <div className="d-flex justify-content-center ">
                                                            <Button variant="primary" className="me-1">
                                                                <span className="d-none d-md-inline" onClick={() => handleOpenModal(ModalsUsers.VIEW_USER, usuario.idUsuarios)}> vista</span>
                                                            </Button>
                                                            <Button variant="danger" className="me-1">
                                                                <span className="d-none d-md-inline"  onClick={() => handleOpenModal(ModalsUsers.DELETE_USER, usuario.idUsuarios)}> Eliminar</span>
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                                {/* funciones Modales */}
                            <MCreateUser show={modalUsers === ModalsUsers.CREATE_USER} handleClose={handleCloseModal} />
                            <MViewUser show={modalUsers === ModalsUsers.VIEW_USER} handleClose={handleCloseModal} userId={selectedUserId} />
                            <MDeleteUser show={modalUsers === ModalsUsers.DELETE_USER} handleClose={handleCloseModal} userId={selectedUserId} />


                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default PageUsers;