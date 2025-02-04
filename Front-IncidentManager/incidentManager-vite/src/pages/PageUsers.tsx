import React, { useState, useEffect } from 'react';
import { getUsers } from '../Data/Services/UsersServices';

/*Componentes */
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { Container, Form, Button, Table } from 'react-bootstrap';
import { IUsuario } from '../Data/Interfaces/IUsers';



const PageUsers: React.FC = () => {
    const [users , setUsers] = useState<IUsuario[]>([]);
    const [user, setUser] = useState<IUsuario | null>(null);


    useEffect(() => {
        const fetchUsers  = async  () => {
            try{
                const UsersData = await getUsers();
                setUsers(UsersData);

            }catch (error) {
                console.error('Error fetching users:', error);
              }
        }
        fetchUsers();


    })

  return (
    <>
      <div className="d-flex vh-100 flex-column flex-md-row  viewinform-container">
        <Sidebar />
        <div className="flex-grow-1 d-flex flex-column viewinform-content">
          <Header />
          <Container className="my-3" style={{ overflowY: 'auto' }}>
            <div>
              <div className="d-flex justify-content-between align-items-center ">
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <Form.Control
                    type="text"
                    placeholder="Buscar usuario"
                    style={{ backgroundColor: '#E2E2E2' }}
                  />
                </div>
                <div className="d-flex justify-content-end align-items-center mt-2">
                  <Button variant="success" className="mb-3" >
                    <i className="fas fa-plus"></i> Agregar usuario
                  </Button>
                </div>
              </div>
              <Table responsive striped bordered hover>
                <thead className="text-center">
                  <tr>
                    <th>#</th>
                    <th>Nombre completo</th>
                    <th>Correo Electronico</th>
                    <th>Correo Personal</th>
                    <th>Contraseña</th>
                    <th>Departamento</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                    {users?.map((user) =>(
                         <tr key={user.ID_Usuario}>
                            <td>{user.ID_Usuario}</td>
                            <td>{user.Nombre} {user.Apellidos}</td>
                            <td>{user.Correo_Electronico}</td>
                            <td>{user.Correo_personal}</td>
                            <td>{user.Contraseña}</td>
                            <td>{user.FK_Departamento}</td>
                            <td>
                      <div className="d-flex justify-content-center m-1">
                        <Button variant="warning" className="me-2"  >
                        <i className="fas fa-edit "></i>
                        </Button>
                        <Button variant="danger" className="me-2" >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </div>
                    </td>




                         </tr>


                    ))}
                </tbody>
              </Table>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default PageUsers;