import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';

/*Componentes */
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

const PageDepartamento: React.FC = () => {
  return (
    <>
      <div className="d-flex vh-100 flex-column flex-md-row viewinform-container">
        <Sidebar />
        <div className="flex-grow-1 d-flex flex-column viewinform-content">
          <Header />
          <Container className="p-4" style={{ overflowY: 'auto' }}>
                    <div className="container mt-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h2 className="reports-title">Departamento</h2>
                     
                        </div>
                        <button className="btn btn-success mb-4">
                            Crear departamento
                        </button>
              

                            <div className="text-center my-4"><p>No se encontraron usuarios</p></div>
                            <Table responsive striped bordered hover>
                                <thead className="text-center bg-light text-dark">
                                    <tr>
                                        <th className="py-3">#</th>
                                        <th className="py-3">Nombre Departamento</th>
                                        <th className="py-3">Extension</th>
                                        <th className="py-3 text-center">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                               
                                        <tr >
                                            <td></td> 
                                            <td></td>
                                         
                                            <td className="py-3">
                                                <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                                                 
                                                </span>
                                            </td>
                                            <td>
                                                <div className="d-flex justify-content-center">
                                                    <Button variant="primary" className="me-1" >
                                                        Editar
                                                    </Button>
                                                    <Button variant="danger" className="me-1" >
                                                        Eliminar
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                            
                                </tbody>
                            </Table>

          
                    </div>
                </Container>
        </div>
      </div>
    </>
  );
};

export default PageDepartamento;
