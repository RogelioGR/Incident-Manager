import React, { useState, useEffect } from 'react';
import { obtenerUsuarios } from '../Data/Services/UsersServices';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { Container, Form, Table } from 'react-bootstrap';
import { IUsuario } from '../Data/Interfaces/IUsers';

const PageUsers: React.FC = () => {
    // Inicializamos users como un array vacío
    const [users, setUsers] = useState<IUsuario[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await obtenerUsuarios();
                // Verificamos que response sea un array
                if (Array.isArray(response)) {
                    setUsers(response);
                } else {
                    setUsers([]);
                    setError('La respuesta no tiene el formato esperado');
                }
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
                setError('Error al cargar los usuarios');
                setUsers([]); 
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Movemos la lógica de filtrado a una función separada
    const getFilteredUsers = () => {
        if (!Array.isArray(users)) return [];
        
        if (!searchTerm) return users;

        return users.filter(user => 
            (user?.Nombre || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user?.Apellidos || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user?.Correo_Electronico || '').toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const filteredUsers = getFilteredUsers();

    return (
        <div className="d-flex vh-100 flex-column flex-md-row viewinform-container">
            <Sidebar />
            <div className="flex-grow-1 d-flex flex-column viewinform-content">
                <Header />
                <Container className="my-3" style={{ overflowY: 'auto' }}>
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <Form.Control 
                                    type="text" 
                                    placeholder="Buscar usuario" 
                                    style={{ backgroundColor: '#E2E2E2' }}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        {loading ? (
                            <div className="text-center my-4">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                            </div>
                        ) : (
                            <Table responsive striped bordered hover>
                                <thead className="text-center">
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre completo</th>
                                        <th>Correo Electrónico</th>
                                        <th>Correo Personal</th>
                                        <th>Departamento</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map(user => (
                                        <tr key={user.ID_Usuario}>
                                            <td>{user.ID_Usuario}</td>
                                            <td>{`${user.Nombre || ''} ${user.Apellidos || ''}`}</td>
                                            <td>{user.Correo_Electronico || ''}</td>
                                            <td>{user.Correo_personal || ''}</td>
                                            <td>{user.FK_Departamento || ''}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}

                        {!loading && filteredUsers.length === 0 && (
                            <div className="text-center my-4">
                                <p>No se encontraron usuarios</p>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default PageUsers;