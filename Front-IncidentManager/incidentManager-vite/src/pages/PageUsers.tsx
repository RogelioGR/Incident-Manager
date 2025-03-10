import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Form, InputGroup } from 'react-bootstrap';

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
                <Container fluid className="p-4" style={{ overflowY: 'auto' }}>
                    <div className="container-fluid mt-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="reports-title">
                                <i className="fa-solid fa-users me-2"></i>
                                Usuarios
                            </h2>
                            <div className="d-flex align-items-center search-container">
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        className="search-input"
                                        placeholder="Buscar Usuarios"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                  
                                    <Button variant="outline-primary">
                                        <i className="fa-solid fa-search"></i>
                                    </Button>
                                </InputGroup>
                            </div>
                        </div>
                        <Button 
                            className="mb-4" 
                            variant="success" 
                            onClick={() => handleOpenModal(ModalsUsers.CREATE_USER)}
                        >
                            <i className="fa-solid fa-user-plus me-2"></i>
                            Crear usuario
                        </Button>
                        
                        {isLoading ? (
                            <div className="text-center p-5">
                                <i className="fa-solid fa-spinner fa-spin fa-2x mb-3"></i>
                                <p>Cargando usuarios...</p>
                            </div>
                        ) : (
                            filteredUsers.length === 0 ? (
                                <div className="text-center my-5">
                                    <i className="fa-solid fa-user-slash fa-2x mb-3 text-muted"></i>
                                    <p>No se encontraron usuarios</p>
                                </div>
                            ) : (
                                <div className="table-responsive shadow-sm rounded">
                                    <Table striped bordered hover className="mb-0">
                                        <thead className="text-center bg-light text-dark">
                                            <tr>
                                                <th className="py-3">#</th>
                                                <th className="py-3">
                                                    <i className="fa-solid fa-user me-2"></i>
                                                    Nombre completo
                                                </th>
                                                <th className="py-3">
                                                    <i className="fa-solid fa-building me-2"></i>
                                                    Departamento
                                                </th>
                                                <th className="py-3">
                                                    <i className="fa-solid fa-envelope me-2"></i>
                                                    Correo Electrónico
                                                </th>
                                                <th className="py-3">
                                                    <i className="fa-solid fa-user-tag me-2"></i>
                                                    Rol
                                                </th>
                                                <th className="py-3 text-center">
                                                    <i className="fa-solid fa-gears me-2"></i>
                                                    Acción
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredUsers.map((view) => (
                                                <tr key={view.idUsuario}>
                                                    <td className="text-center">{view.idUsuario}</td>
                                                    <td>
                                                            {view.apellidos} {view.nombre}
                                                    </td>
                                                    <td>{view.fkDepartamento}</td>
                                                    <td>
                                                            {view.correoElectronico}
                                                        
                                                    </td>
                                                    <td className="text-center">
                                                        <span className="badge bg-light text-dark border rounded-pill px-3 py-2">
                                                            {view.fkRol}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex justify-content-center gap-2">
                                                            <Button 
                                                                variant="outline-primary" 
                                                                size="sm"
                                                                onClick={() => handleOpenModal(ModalsUsers.VIEW_USER, view.idUsuario)}
                                                                title="Ver detalles"
                                                            >
                                                                <i className="fa-solid fa-eye"></i>
                                                            </Button>
                                                            
                                                            <Button 
                                                                variant="outline-danger" 
                                                                size="sm"
                                                                onClick={() => handleOpenModal(ModalsUsers.DELETE_USER, view.idUsuario)}
                                                                title="Eliminar usuario"
                                                            >
                                                                <i className="fa-solid fa-trash-can"></i>
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )
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