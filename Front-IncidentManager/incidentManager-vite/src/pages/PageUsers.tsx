import React, { useEffect, useState } from 'react';
import { obtenerUsuarios } from '../Data/Services/UsersServices';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { Container, Form, Table, Alert, Button } from 'react-bootstrap';
import { IUsuario } from '../Data/Interfaces/IUsers';

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

    return (
        <div className="d-flex vh-100 flex-column flex-md-row viewinform-container">
            <Sidebar />
            <div className="flex-grow-1 d-flex flex-column viewinform-content">
                <Header />
                <Container className="my-3" style={{ overflowY: 'auto' }}>
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Buscar usuario"
                                style={{ backgroundColor: '#E2E2E2' }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

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
                                            <td >{usuario.apellidos}{usuario.nombre}</td>
                                            <td>{usuario.fkDepartamento}</td>
                                            <td>{usuario.correoElectronico}</td>
                                            <td>{usuario.correoPersonal}</td>
                                            <td>
                                                <div className="d-flex justify-content-center m-1">
                                                <Button variant="primary" className="me-2" disabled>
                                                    <i className="fas fa-plus"></i>
                                                    <span className="d-none d-md-inline"> view</span>
                                                </Button>
                                                <Button variant="warning" className="me-2" disabled>
                                                    <i className="fas fa-plus"></i>
                                                    <span className="d-none d-md-inline"> Edit</span>
                                                </Button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default PageUsers;
