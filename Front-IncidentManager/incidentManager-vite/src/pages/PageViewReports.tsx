/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Badge, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

import { IViewReporte } from '../Data/Interfaces/ViewReports';
import { GetViewReportid } from '../Data/Services/ReportServices';
import { IComentario } from '../Data/Interfaces/lComentarios';
import { GetCommentsId } from '../Data/Services/commentServices';

const PageViewReports: React.FC = () => {
    const { idReporte } = useParams<{ idReporte: string }>();
    const [taskData, setTaskData] = useState<IViewReporte | null>(null);
    const [commentData, setCommentData] = useState<IComentario | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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


    const priorityColors: Record<string, string> = {
        alta: 'danger',
        media: 'warning',
        baja: 'success'
    };
    const statusColors: Record<string, string> = {
        enviado: 'info',
        'en proceso': 'primary',
        finalizado: 'success',
        'no finalizado': 'danger'
    };

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
                <div style={{ margin: '20px' }} className='viewPages-fade-in'>
                    <Container className="flex-grow-1">
                        <div className="p-3 mb-4 rounded shadow-sm">
                            <Row className="align-items-center">
                                <Col md={8}>
                                    <h2 className="mb-2">{taskData ? taskData.titulo : "Reporte null"}</h2>
                                </Col>
                                <Col md={4} className="text-md-end mt-2 mt-md-0 ">
                                    <div className="d-flex flex-column flex-md-row justify-content-md-end gap-2">
                                        <Badge bg={taskData ? getPriorityColor(taskData.prioridadReporte) : 'secondary'} className="p-2 me-2">
                                            Prioridad: {taskData ? taskData.prioridadReporte : "N/A"}
                                        </Badge>
                                        <Badge bg={taskData ? getStatusColor(taskData.estadoReporte) : 'secondary'} className="p-2">
                                            Estado: {taskData ? taskData.estadoReporte : "N/A"}
                                        </Badge>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <Row className="mb-4">
                            <Col md={6}>
                                <div className="d-flex justify-content-between text-muted">
                                    <small>Creado por: {taskData ? taskData.usuarioCreador : "N/A"}</small>
                                    <small>Fecha: {taskData ? new Date(taskData.fecha_Creada).toLocaleDateString() : "N/A"}</small>
                                </div>
                                <div className="p-3 bg-white rounded shadow-sm mb-3 mb-md-0">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="mb-0">Instrucción</h4>
                                        {taskData && (
                                            <Button variant="warning" size="sm">
                                                <i className="fas fa-pen me-1"></i> Editar
                                            </Button>
                                        )}
                                    </div>
                                    <p className="text-justify mb-3">
                                        {taskData ? taskData.descripcion : "Por el momento el reporte no se visualiza"}
                                    </p>
                                </div>
                            </Col>
                            <Col>
                                <div className="p-3 bg-white rounded shadow-sm">
                                    <h4 className="mb-3">Evidencia</h4>
                                    {commentData && commentData.comentario1 ? (
                                        <>
                                            <strong>Contenido:</strong>
                                            <p className='m-2'>{commentData.comentario1}</p>
                                        </>
                                    ) : (
                                        <p className="text-muted">Por el momento no hay respuesta</p>
                                    )}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center gap-2 flex-wrap">
                                <Button variant="success" disabled={!taskData}>
                                    <i className="fas fa-flag-checkered me-1"></i> Finalizado
                                </Button>
                                <Button variant="primary" disabled={!taskData}>
                                    <i className="fas fa-edit me-1"></i> En proceso
                                </Button>
                                <Button variant="danger" disabled={!taskData}>
                                    <i className="fas fa-exclamation-triangle me-1"></i> Reporte no realizado
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default PageViewReports;