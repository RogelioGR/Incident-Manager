import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

/* Importacion de services  */
import { viewUsuarios } from '../Data/Services/UsersServices';
import { IViewUsuario } from '../Data/Interfaces/viewUsers';

/* Importacion de paginas y modales */
import MCreateUser from '../Components/Modals/Users/McreateUsers';
import MViewUser from '../Components/Modals/Users/MviewUsers';
import MDeleteUser from '../Components/Modals/Users/MdropUsers';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const PageUsers: React.FC = () => {
    const [users, setUsers] = useState<IViewUsuario[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Estados para controlar los modales
    enum ModalsUsers {
        NONE = 'NONE',
        CREATE_USER = 'CREATE_USER',
        DELETE_USER = 'DELETE_USER',
        VIEW_USER = 'VIEW_USER',
    }

    const [modalUsers, setModalUsers] = useState(ModalsUsers.NONE);
    const [selectedUserId, setSelectedUserId] = useState<number>();

    useEffect(() => {
        let isMounted = true;

        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const usersData = await viewUsuarios();
                if (isMounted) {
                    setUsers(usersData);
                }
            } catch (error) {
                console.error('Error al cargar los usuarios:', error);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };
        fetchUsers();
        return () => {
            isMounted = false;
        };
    }, []);

    const getFilteredUsers = (users: IViewUsuario[], searchTerm: string) => {
        return users.filter(user =>
            user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user?.apellidos?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.correoElectronico.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const filteredUsers = getFilteredUsers(users, searchTerm);

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
                        ) :(
                    filteredUsers.length === 0 ? (
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
                                            <td>{view.correoPersonal ? view.correoPersonal : <i>Sin correo</i>}</td>
                                            <td className="py-3">
                                                <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                                                    {view.fkRol}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="d-flex justify-content-center">
                                                    <Button variant="primary" className="me-1" onClick={() => handleOpenModal(ModalsUsers.VIEW_USER, view.idUsuario)}>
                                                        Ver
                                                    </Button>
                                                    <Button variant="danger" className="me-1" onClick={() => handleOpenModal(ModalsUsers.DELETE_USER, view.idUsuario)}>
                                                        Eliminar
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ))}
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