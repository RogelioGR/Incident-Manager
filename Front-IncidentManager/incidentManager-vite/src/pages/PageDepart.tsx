import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';

/* importacion del services */
import { IDepartamento } from '../Data/Interfaces/lDepartamento';
import { GetDepartment } from '../Data/Services/departmentServices';

/*Componentes */
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import MCreateDepart from '../Components/Modals/Departments/McreateDepartments';

const PageDepartamento: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [departments, setDepartments] = useState<IDepartamento[]>([]);

    enum ModalsDEPART {
        NONE = 'NONE',
        CREATE_DEPART = 'CREATE_DEPART',
        DELETE_DEPART = 'DELETE_DEPART',
    }
        const [modalDepart, setModalDeparts] = useState(ModalsDEPART.NONE);
    


    useEffect(() => {
        let isMounted = true;

        const fechDepart = async () => {
            try {
                setIsLoading(true);
                const usersData = await GetDepartment();
                if (isMounted) {
                    setDepartments(usersData);
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
    const handleCloseModal = () => setModalDeparts(ModalsDEPART.NONE);
    const handleOpenModal = (type: ModalsDEPART) => {
        setModalDeparts(type);
    };


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
                            <button className="btn btn-success mb-4" onClick={() => handleOpenModal(ModalsDEPART.CREATE_DEPART)}>
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
                                                </tr>
                                            ))}

                                        </tbody>
                                    </Table>
                                ))}
                                <MCreateDepart show={modalDepart === ModalsDEPART.CREATE_DEPART} handleClose={handleCloseModal}/>


                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default PageDepartamento;
