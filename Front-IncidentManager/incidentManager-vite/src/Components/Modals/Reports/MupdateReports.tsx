import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

/* Importación de servicios y interfacez */
import { IReportes } from "../../../Data/Interfaces/lReports";
import { Iprioridad } from "../../../Data/Interfaces/lPrioridad";
import { IUsuario } from "../../../Data/Interfaces/IUsers";
import { GetPriority } from "../../../Data/Services/priorityServices";
import { obtenerUsuarios } from "../../../Data/Services/UsersServices";
import { GetReportid, updateReports } from "../../../Data/Services/ReportServices";

interface MEditProps {
    show: boolean;
    handleClose: () => void;
    reportsId?: number;
}

const MySwal = withReactContent(Swal);

const MEditReports: React.FC<MEditProps> = ({ show, handleClose, reportsId }) => {
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [prioridades, setPrioridades] = useState<Iprioridad[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState<IReportes>({
        titulo: "",
        fkDestinatario: 0,
        fkPrioridad: 0,
        descripcion: "",
        fkEstado: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [usuariosData, prioridadesData] = await Promise.all([
                    obtenerUsuarios(),
                    GetPriority()
                ]);
                setUsuarios(usuariosData);
                setPrioridades(prioridadesData);
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

    useEffect(() => {
        const fetchReportData = async () => {
            if (reportsId !== undefined) {
                try {
                    setIsLoading(true);
                    const reportData = await GetReportid(reportsId);
                    if (reportData) {
                        setFormData({
                            titulo: reportData.titulo || "",
                            descripcion: reportData.descripcion || "",
                            fkDestinatario: reportData.fkDestinatario || 0,
                            fkPrioridad: reportData.fkPrioridad || 0,
                            fkEstado: reportData.fkEstado || 0
                        });
                    }
                } catch (error) {
                    console.error("Error al cargar los datos del reporte:", error);
                    MySwal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Hubo un error al cargar los datos del reporte"
                    });
                } finally {
                    setIsLoading(false);
                }
            }
        };
        if (show && reportsId) fetchReportData();
    }, [reportsId, show]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: ["fkPrioridad", "fkDestinatario", "fkEstado"].includes(name) ? Number(value) : value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (reportsId === undefined) {
            MySwal.fire({
                icon: "error",
                title: "Error",
                text: "ID de reporte no proporcionado"
            });
            return;
        }
        
        try {
            setIsLoading(true);
            await updateReports(reportsId, formData);
            MySwal.fire({
                title: "¡Éxito!",
                text: "El reporte ha sido actualizado correctamente",
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
            console.error("Error al actualizar el reporte:", error);
            MySwal.fire({
                icon: "error",
                title: "Error al actualizar",
                text: "No se pudo actualizar el reporte. Inténtelo de nuevo más tarde."
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Función para obtener color según prioridad
    const getPriorityColor = (priorityId: number) => {
        switch (priorityId) {
            case 1: return "#28a745"; // Baja - Verde
            case 2: return "#ffc107"; // Media - Amarillo
            case 3: return "#dc3545"; // Alta - Rojo
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
                                              <h2 className="text-center mb-4"> <i className="fa-solid fa-pen-to-square me-2" ></i>
                                              Editar Reporte</h2>

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
                                                            {prioridad.idPrioridad === 1 && "🟢 "}
                                                            {prioridad.idPrioridad === 2 && "🟡 "}
                                                            {prioridad.idPrioridad === 3 && "🔴 "}
                                                            {prioridad.nombrePrioridad}
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
                                                    placeholder="Describa detalladamente el problema o solicitud"
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
                                            <i className="fa-solid fa-floppy-disk me-2"></i>
                                            Guardar Cambios
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
        </Modal>
    );
};

export default MEditReports;