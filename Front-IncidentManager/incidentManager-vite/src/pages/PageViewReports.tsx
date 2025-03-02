import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import { IViewReporte } from '../Data/Interfaces/ViewReports';
import { GetViewReportid } from '../Data/Services/ReportServices';

const PageViewReports: React.FC = () => {
    const { idReporte } = useParams<{ idReporte: string }>(); 
    const [taskData, setTaskData] = useState<IViewReporte | null>(null);
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
                }
            } catch (err) {
                setError('No se pudo cargar el reporte.');
                console.error(err);
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
    if (error) {
        return (
            <div className="d-flex vh-100 justify-content-center align-items-center">
                <Alert variant="danger">{error}</Alert>
            </div>
        );
    }

    if (!taskData) {
        return (
            <div className="d-flex vh-100 justify-content-center align-items-center">
                <Alert variant="warning">No se encontraron datos del reporte.</Alert>
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
                                    <h2 className="mb-2">{taskData.titulo}</h2>
                                </Col>
                                <Col md={4} className="text-md-end mt-2 mt-md-0 ">
                                    <div className="d-flex flex-column flex-md-row justify-content-md-end gap-2">
                                        <Badge bg={getPriorityColor(taskData.prioridadReporte)} className="p-2 me-2">
                                            Prioridad: {taskData.prioridadReporte}
                                        </Badge>
                                        <Badge bg={getStatusColor(taskData.estadoReporte)} className="p-2">
                                            Estado: {taskData.estadoReporte}
                                        </Badge>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <Row className="mb-4">
                            <Col md={6}>
                                <div className="d-flex justify-content-between text-muted">
                                    <small>Creado por: {taskData.usuarioCreador}</small>
                                    <small>Fecha: {new Date(
                                        taskData.fecha_Creada
                              ).toLocaleDateString()}</small>
                                </div>
                                <div className="p-3 bg-white rounded shadow-sm mb-3 mb-md-0">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="mb-0">Instrucción</h4>
                                        <Button variant="warning" size="sm">
                                            <i className="fas fa-pen me-1"></i> Editar
                                        </Button>
                                    </div>
                                    <p className="text-justify mb-3">{taskData.descripcion}</p>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="p-3 bg-white rounded shadow-sm">
                                    <h4 className="mb-3">Evidencia</h4>
                                    <p>No se ha proporcionado evidencia.</p>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="d-flex justify-content-center gap-2 flex-wrap">
                                <Button variant="success">
                                    <i className="fas fa-flag-checkered me-1"></i> Finalizado
                                </Button>
                                <Button variant="primary">
                                    <i className="fas fa-edit me-1"></i> En proceso
                                </Button>
                                <Button variant="danger">
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
