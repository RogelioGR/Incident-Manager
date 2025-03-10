import React, { useState, useEffect } from 'react';
import { Modal, Button, Container, Row, Col, Form, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

/* Services y interfaces */
import { IReportes } from '../../../Data/Interfaces/lReports';
import { IUsuario } from '../../../Data/Interfaces/IUsers';
import { Iprioridad } from '../../../Data/Interfaces/lPrioridad';
import { obtenerUsuarios } from '../../../Data/Services/UsersServices';
import { GetPriority } from '../../../Data/Services/priorityServices';
import { createReportsEmail } from '../../../Data/Services/EmailServices';
import { ITipoReporte } from '../../../Data/Interfaces/ITipoReporte';
import { GetTipReports } from '../../../Data/Services/TipoReporteServices';

import MinformModal from '../Minfom';

interface MCreateProps {
    show: boolean;
    handleClose: () => void;
}

const MySwal = withReactContent(Swal);

const CrearReporteModal: React.FC<MCreateProps> = ({ show, handleClose }) => {
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [prioridades, setPrioridades] = useState<Iprioridad[]>([]);
    const [tipoReporte, setTipoReporte] = useState<ITipoReporte[]>([]);
    const [modalType, setModalType] = useState<'VIEW' | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState<IReportes>({
        titulo: '',
        fkDestinatario: 0,
        fkPrioridad: 0,
        descripcion: '',
        fkEstado: 1,
        fkTipoReporte: 0,
        fechaCreada: new Date().toISOString(),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [usuariosData, prioridadesData, tipoReporteData] = await Promise.all([
                    obtenerUsuarios(),
                    GetPriority(),
                    GetTipReports()
                ]);
                
                const usuariosSistema = usuariosData.filter(usuario => usuario.fkDepartamento === 1);
                setUsuarios(usuariosSistema);
                setPrioridades(prioridadesData);
                setTipoReporte(tipoReporteData);
            } catch (error) {
                console.error("Error al obtener datos:", error);
                MySwal.fire({
                    icon: "error",
                    title: "Error de conexión",
                    text: "No se pudieron cargar los datos necesarios"
                });
            } finally {
                setIsLoading(false);
            }
        };
        
        if (show) fetchData();
    }, [show]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: ["fkPrioridad", "fkDestinatario", "fkEstado", "fkTipoReporte"].includes(name) 
                ? Number(value) 
                : value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            setIsLoading(true);
            await createReportsEmail({
                titulo: formData.titulo,
                fkDestinatario: formData.fkDestinatario,
                fkPrioridad: formData.fkPrioridad,
                descripcion: formData.descripcion,
                fkEstado: formData.fkEstado,
                fechaCreada: formData.fechaCreada,
                fkTipoReporte: formData.fkTipoReporte
            });
            
            MySwal.fire({
                title: "¡Éxito!",
                text: "El reporte ha sido creado exitosamente",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#28a745"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
            
            handleClose();
        } catch (error) {
            console.error("Error al crear el reporte:", error);
            MySwal.fire({
                icon: "error",
                title: "Error al crear",
                text: "No se pudo crear el reporte. Inténtelo de nuevo más tarde."
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Función para obtener color según prioridad
    const getPriorityColor = (priorityId: number) => {
        switch (priorityId) {
            case 3: return "#28a745"; // Baja - Verde
            case 2: return "#ffc107"; // Media - Amarillo
            case 1: return "#dc3545"; // Alta - Rojo
            default: return "#6c757d"; // Gris por defecto
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static">
            <Modal.Header closeButton >
                <Modal.Title>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light">
                <Container className="py-3">
                    <Card className="shadow-sm">
                        <Card.Body>
                            {isLoading ? (
                                <div className="text-center py-4">
                                    <i className="fa-solid fa-circle-notch fa-spin fa-2x text-primary"></i>
                                    <p className="mt-2">Cargando datos...</p>
                                </div>
                            ) : (
                                <Form onSubmit={handleSubmit}>
                                     <h2 className="text-center mb-4"> <i className="fa-solid fa-plus-circle me-2" ></i>
                                     Crear Reporte</h2>
                                    <Row>
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    <i className="fa-solid fa-heading me-2" style={{ color: "#0d6efd" }}></i>
                                                    Título del reporte:
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Ingrese el título del reporte"
                                                    name="titulo"
                                                    value={formData.titulo}
                                                    onChange={handleChange}
                                                    required
                                                    className="border-primary"
                                                />
                                            </Form.Group>
                                        </Col>
                                        
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    <i className="fa-solid fa-user me-2" style={{ color: "#6610f2" }}></i>
                                                    Destinatario:
                                                </Form.Label>
                                                <Form.Select
                                                    name="fkDestinatario"
                                                    value={formData.fkDestinatario}
                                                    onChange={handleChange}
                                                    required
                                                    className="border-primary"
                                                >
                                                    <option value={0}>Seleccione un destinatario</option>
                                                    {usuarios.map((usuario) => (
                                                        <option key={usuario.idUsuarios} value={usuario.idUsuarios}>
                                                            {usuario.nombre} {usuario.apellidos}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    <i className="fa-solid fa-flag me-2" style={{ color: formData.fkPrioridad ? getPriorityColor(formData.fkPrioridad) : "#6c757d" }}></i>
                                                    Nivel de Prioridad:
                                                </Form.Label>
                                                <Form.Select
                                                    name="fkPrioridad"
                                                    value={formData.fkPrioridad}
                                                    onChange={handleChange}
                                                    required
                                                    className="border-primary"
                                                >
                                                    <option value={0}>Seleccione una prioridad</option>
                                                    {prioridades.map((prioridad) => (
                                                        <option key={prioridad.idPrioridad} value={prioridad.idPrioridad}>
                                                            {prioridad.idPrioridad === 1 && "🔴 "}
                                                            {prioridad.idPrioridad === 2 && "🟡 "}
                                                            {prioridad.idPrioridad === 3 && "🟢"}
                                                            {prioridad.nombrePrioridad}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    <i className="fa-solid fa-tags me-2" style={{ color: "#20c997" }}></i>
                                                    Tipo de reporte:
                                                    <i
                                                        className="fa-solid fa-circle-question ms-2"
                                                        style={{ cursor: 'pointer', color: "#0dcaf0" }} 
                                                        onClick={() => setModalType('VIEW')}
                                                    ></i>
                                                </Form.Label>
                                                <Form.Select
                                                    name="fkTipoReporte"
                                                    value={formData.fkTipoReporte}
                                                    onChange={handleChange}
                                                    required
                                                    className="border-primary"
                                                >
                                                    <option value={0}>Seleccione el tipo de reporte</option>
                                                    {tipoReporte.map((tipo) => (
                                                        <option key={tipo.idTipo} value={tipo.idTipo}>
                                                            {tipo.nombreTipo}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    <i className="fa-solid fa-align-left me-2" style={{ color: "#0dcaf0" }}></i>
                                                    Descripción:
                                                </Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={4}
                                                    name="descripcion"
                                                    placeholder="Describa detalladamente el problema "
                                                    value={formData.descripcion}
                                                    onChange={handleChange}
                                                    required
                                                    className="border-primary"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    
                                    <div className="d-flex justify-content-center gap-3 mt-4">
                                        <Button 
                                            variant="success" 
                                            type="submit"
                                            className="px-4 py-2"
                                            disabled={isLoading}
                                        >
                                            <i className="fa-solid fa-paper-plane me-2"></i>
                                            Crear Reporte
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            onClick={handleClose}
                                            className="px-4 py-2"
                                            disabled={isLoading}
                                        >
                                            <i className="fa-solid fa-xmark me-2"></i>
                                            Cancelar
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Card.Body>
                    </Card>
                </Container>
            </Modal.Body>
            {modalType === 'VIEW' && <MinformModal show={true} handleClose={() => setModalType(null)}/>}
        </Modal>
    );
};

export default CrearReporteModal;