import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';

/* importacion del services */
import { IDepartamento } from '../Data/Interfaces/lDepartamento';
import { GetDepartment } from '../Data/Services/departmentServices';

/*Componentes */
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import MCreateDepart from '../Components/Modals/Departments/McreateDepartments';
import MDeleteDepart from '../Components/Modals/Departments/MdropDepartments';

const PageDepartamento: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [departments, setDepartments] = useState<IDepartamento[]>([]);
    const [modalType, setModalType] = useState<'CREATE' | 'EDIT' | 'DELETE' | null>(null);
    const [selectedDepartId, setSelectedDepartId] = useState<number |null >(null);
    useEffect(() => {
        let isMounted = true;

        const fechDepart = async () => {
            try {
                setIsLoading(true);
                const DepartmentData = await GetDepartment();
                if (isMounted) {
                    setDepartments(DepartmentData);
                }
            } catch (error) {
                console.error('Error al cargar los Departamento:', error);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };
        fechDepart();
        return () => {
            isMounted = false;
        };
    }, []);

    const getfilteredDepart = (departments: IDepartamento[]) => {
        return departments.filter(departments =>
            departments.nombreDepartamentos.toLowerCase() ||
            departments.extension
        )
    }
    const filteredDepart = getfilteredDepart(departments);
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
                            <button className="btn btn-success mb-4" 
                            onClick={() => setModalType('CREATE')}>
                                Crear departamento
                            </button>
                            {isLoading ? (
                                <div className="text-center"><p>Cargando Departamento...</p></div>
                            ) : (
                                getfilteredDepart.length === 0 ? (
                                    <div className="text-center my-4"><p>No se encontraron los departamentos</p></div>
                                ) : (
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
                                            {filteredDepart.map((depart) => (
                                                <tr key={depart.idDepartamento}>
                                                    <td>{depart.idDepartamento}</td>
                                                    <td>{depart.nombreDepartamentos}</td>
                                                    <td>{depart.extension}</td>
                                                    <td>
                                                        <div className="d-flex justify-content-center">
                                                            <Button variant="primary" className="me-1"
                                                             onClick={() => {
                                                                setSelectedDepartId(depart.idDepartamento ?? null);
                                                                setModalType('DELETE');
                                                             }}>
                                                                eliminar
                                                            </Button>

                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </Table>
                                ))}      
                                {modalType === 'CREATE' && <MCreateDepart show={true} handleClose={() => setModalType(null)} />}
                                {modalType === 'DELETE' && selectedDepartId !== null && (
      <MDeleteDepart show={true} handleClose={() => setModalType(null)} departId={selectedDepartId} />
      )}


                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default PageDepartamento;
