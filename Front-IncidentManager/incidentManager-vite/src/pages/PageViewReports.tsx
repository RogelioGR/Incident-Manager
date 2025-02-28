import React, { useState } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const PageViewReports = () => {
    // Estado para los datos de la tarea (esto podría venir de una API o prop)
    const [taskData, setTaskData] = useState({
        roomName: "Habitación de prueba",
        description: "Descripción de la tarea de prueba. Se requiere revisar las instalaciones eléctricas y asegurar que todos los enchufes funcionen correctamente.",
        evidence: "Comentario de prueba sobre la evidencia. Se encontraron 2 enchufes sin funcionamiento en la pared norte.",
        date: "27/02/2025",
        priority: "Alta",
        status: "Pendiente",
        createdBy: "Juan Pérez"
    });

    // Función para determinar el color de la prioridad
    const getPriorityColor = (priority) => {
        switch(priority.toLowerCase()) {
            case 'alta':
                return 'danger';
            case 'media':
                return 'warning';
            case 'baja':
                return 'success';
            default:
                return 'secondary';
        }
    };

    // Función para determinar el color del estado
    const getStatusColor = (status) => {
        switch(status.toLowerCase()) {
            case 'pendiente':
                return 'warning';
            case 'en progreso':
                return 'primary';
            case 'completado':
                return 'success';
            case 'cancelado':
                return 'danger';
            default:
                return 'secondary';
        }
    };

    return (
        <div className="d-flex vh-100">
            <Sidebar />
            <div className="flex-grow-1 d-flex flex-column">
                <Header />
                <div style={{ margin: '20px' }} className='viewPages-fade-in'>
                    <Container className="flex-grow-1">
                        <div className="bg-light p-3 mb-4 rounded shadow-sm">
                            <Row className="align-items-center">
                                <Col md={8}>
                                    <h2 className="mb-2">Habitación: {taskData.roomName}</h2>
                                </Col>
                                <Col md={4} className="text-md-end mt-2 mt-md-0">
                                    <div className="d-flex flex-column flex-md-row justify-content-md-end gap-2">
                                        <Badge bg={getPriorityColor(taskData.priority)} className="p-2 me-2">
                                            Prioridad: {taskData.priority}
                                        </Badge>
                                        <Badge bg={getStatusColor(taskData.status)} className="p-2">
                                            Estado: {taskData.status}
                                        </Badge>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <Row className="mb-4">
                            <Col md={6}>
                                    <div className="d-flex justify-content-between text-muted">
                                        <small>Creado por: {taskData.createdBy}</small>
                                        <small>Fecha: {taskData.date}</small>
                                    </div>
                                <div className="p-3 bg-white rounded shadow-sm mb-3 mb-md-0">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="mb-0">Instrucción</h4>
                                        <Button variant="warning" size="sm">
                                            <i className="fas fa-pen me-1"></i> Editar
                                        </Button>
                                    </div>
                                    <p className="text-justify mb-3">{taskData.description}</p>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="p-3 bg-white rounded shadow-sm">
                                    <h4 className="mb-3">Evidencia</h4>
                                    <p>{taskData.evidence}</p>
                                  
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
                                <Button variant="warning">
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