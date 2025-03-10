import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Badge, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import MEditReports from '../Components/Modals/Reports/MupdateReports';

import { IViewReporte } from '../Data/Interfaces/ViewReports';
import { GetViewReportid } from '../Data/Services/ReportServices';
import { IComentario } from '../Data/Interfaces/lComentarios';
import { GetCommentsId } from '../Data/Services/commentServices';

const PageViewReports: React.FC = () => {
    const { idReporte } = useParams<{ idReporte: string }>();
    const [taskData, setTaskData] = useState<IViewReporte | null>(null);
    const [commentData, setCommentData] = useState<IComentario | null>(null);
    const [modalType, setModalType] = useState<'EDIT' | null>(null);
    const [selectedDepartId, setSelectedDepartId] = useState<number | null>(null);
    
    const [loading, setLoading] = useState(true);
    const [, setError] = useState<string | null>(null);

    const priorityColors: Record<string, string> = {
        alta: 'danger',
        media: 'warning',
        baja: 'success'
    };
    
    const statusColors: Record<string, string> = {
        enviado: 'info',
        'en proceso': 'warning',
        finalizado: 'success',
        'no finalizado': 'danger'
    };

    const getPriorityColor = (priority: string) => priorityColors[priority.toLowerCase()] || 'secondary';
    const getStatusColor = (status: string) => statusColors[status.toLowerCase()] || 'secondary';

    useEffect(() => {
        const fetchReport = async () => {
            try {
                if (idReporte) {
                    const data = await GetViewReportid(parseInt(idReporte, 10));
                    setTaskData(data);
                    if (data?.idComentario) {
                        const comentario = await GetCommentsId(data.idComentario);
                        setCommentData(comentario);
                    }
                }
            } catch (error) {
                setError('No se pudo cargar el reporte.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, [idReporte]);

    if (loading) {
        return (
            <div className="d-flex vh-100 justify-content-center align-items-center">
                <Spinner animation="border" />
            </div>
        );
    }


    return (
        <div className="d-flex vh-100">
            <Sidebar />
            <div className="flex-grow-1 d-flex flex-column">
                <Header />
                <div className="flex-grow-1 p-3 p-md-4 bg-light">
                    <Container fluid className="px-md-4">
                        {/* Cabecera del reporte */}
                        <div className="mb-4 bg-white p-3 rounded shadow-sm">
                            <Row className="align-items-center">
                                <Col xs={12} md={8}>
                                    <h3 className="mb-0">
                                        <i className="fa-solid fa-file-lines me-2"></i>
                                        {taskData ? taskData.titulo : "Reporte no disponible"}
                                    </h3>
                                </Col>
                                <Col xs={12} md={4} className="text-md-end mt-2 mt-md-0">
                                    <Badge 
                                        bg={taskData ? getPriorityColor(taskData.prioridadReporte) : 'secondary'} 
                                        className="me-2 py-2 px-3"
                                    >
                                        Prioridad: {taskData ? taskData.prioridadReporte : "N/A"}
                                    </Badge>
                                {taskData?.estadoReporte && (
                                        <Badge 
                                            bg={getStatusColor(taskData.estadoReporte)} 
                                            className="py-2 px-3"
                                        >
                                            <i className="fa-solid fa-circle-info me-1"></i>
                                            Estado: {taskData.estadoReporte}
                                        </Badge>
                                    )}
                                </Col>
                            </Row>
                            <hr className="my-3" />
                            <div className="d-flex flex-wrap justify-content-between text-muted">
                                <div className="me-3 mb-2">
                                    <i className="fa-solid fa-user me-1"></i>
                                    Creado por: {taskData ? taskData.usuarioCreador : "N/A"}
                                </div>
                                <div className="mb-2">
                                    <i className="fa-solid fa-calendar me-1"></i>
                                    Fecha: {taskData ? new Date(taskData.fecha_Creada).toLocaleDateString() : "N/A"}
                                </div>
                            </div>
                        </div>

                        <Row>
                           
                            <Col xs={12} md={6} className="mb-4">
                                <div className="bg-white rounded shadow-sm h-100">
                                    <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                                        <h5 className="mb-0">
                                            <i className="fa-solid fa-clipboard-list me-2"></i>
                                            Instrucción
                                        </h5>
                                        <Button 
                                            variant="warning" 
                                            size="sm"
                                            className="px-3"
                                            onClick={() => {
                                                setSelectedDepartId(taskData?.iD_Reporte ?? null);
                                                setModalType('EDIT');
                                            }}
                                        >
                                            <i className="fa-solid fa-pen me-1"></i> Editar
                                        </Button>
                                    </div>
                                    <div className="p-3">
                                        {taskData?.descripcion ? (
                                            <p className="mb-0">{taskData.descripcion}</p>
                                        ) : (
                                            <div className="text-center text-muted py-3">
                                                <i className="fa-solid fa-xmark me-2"></i>
                                                Por el momento el reporte no se visualiza
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Col>

                            {/* Evidencia */}
                            <Col xs={12} md={6} className="mb-4">
                                <div className="bg-white rounded shadow-sm h-100">
                                    <div className="p-3 border-bottom">
                                        <h5 className="mb-0">
                                            <i className="fa-solid fa-image me-2"></i>
                                            Respuesta
                                        </h5>
                                    </div>
                                    <div className="p-3">
                                        {commentData && commentData.comentario1 ? (
                                            <p className="mb-0">{commentData.comentario1}</p>
                                        ) : (
                                            <div className="text-center text-muted py-3">
                                                <i className="fa-solid fa-xmark me-2"></i>
                                                Por el momento no hay respuesta
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        
                       
                        {modalType === 'EDIT' && selectedDepartId !== null && (
                            <MEditReports 
                                show={true} 
                                handleClose={() => setModalType(null)} 
                                reportsId={selectedDepartId} 
                            />
                        )}
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default PageViewReports;