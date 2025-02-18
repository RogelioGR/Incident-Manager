import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { viewUsuarios } from '../Data/Services/UsersServices'; // Actualiza la importación
import { IViewUsuario } from '../Data/Interfaces/viewUsers';
import MCreateUser from '../Components/Modals/Users/McreateUsers';
import MViewUser from '../Components/Modals/Users/MviewUsers';
import MDeleteUser from '../Components/Modals/Users/MdropUsers';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const PageUsers: React.FC = () => {
    const [users, setUsers] = useState<IViewUsuario[]>([]); 
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const usersData = await viewUsuarios(); // Llamamos a la función viewUsuarios
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
        <div className="d-flex vh-100 flex-column flex-md-row viewinform-container">
            <Sidebar />
            <div className="flex-grow-1 d-flex flex-column viewinform-content">
                <Header />
                <Container className="p-4" style={{ overflowY: 'auto' }}>
                    <div className="container mt-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h2 className="reports-title">Usuarios</h2>
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
                        <button className="btn btn-success mb-4" onClick={() => handleOpenModal(ModalsUsers.CREATE_USER)}>
                            Crear usuario
                        </button>
                        {isLoading ? (
                            <div className="text-center"><p>Cargando usuarios...</p></div>
                        ) : filteredUsers.length === 0 ? (
                            <div className="text-center my-4"><p>No se encontraron usuarios</p></div>
                        ) : (
                            <Table responsive striped bordered hover>
                                <thead className="text-center bg-light text-dark">
                                    <tr>
                                    <th className="py-3">#</th>
                                                <th className="py-3">Nombre completo</th>
                                                <th className="py-3">Departamento</th>
                                                <th className="py-3">Correo Electrónico</th>
                                                <th className="py-3">Correo Personal</th>
                                                <th className="py-3">Rol</th>
                                                <th className="py-3 text-center">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((view) => (
                                        <tr key={view.idUsuario}>
                                            <td>{view.idUsuario}</td>
                                            <td>{view.apellidos} {view.nombre}</td>
                                            <td>{view.fkDepartamento}</td>
                                            <td>{view.correoElectronico}</td>
                                            <td>{view.correoPersonal}</td>
                                            <td className="py-3">
                                                        <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                                                            {view.fkRol}
                                                        </span>
                                                    </td>

                                            <td>
                                                <div className="d-flex justify-content-center">
                                                    <Button variant="primary" className="me-1" onClick={() => handleOpenModal(ModalsUsers.VIEW_USER, view.idUsuario)}>Ver</Button>
                                                    <Button variant="danger" className="me-1" onClick={() => handleOpenModal(ModalsUsers.DELETE_USER, view.idUsuario)}>Eliminar</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                        {/* Modales */}
                        <MCreateUser show={modalUsers === ModalsUsers.CREATE_USER} handleClose={handleCloseModal} />
                        <MViewUser show={modalUsers === ModalsUsers.VIEW_USER} handleClose={handleCloseModal} userId={selectedUserId} />
                        <MDeleteUser show={modalUsers === ModalsUsers.DELETE_USER} handleClose={handleCloseModal} userId={selectedUserId} />
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default PageUsers;
