import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

/* Importación de servicios */
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
                const [usuariosData, prioridadesData] = await Promise.all([
                    obtenerUsuarios(),
                    GetPriority()
                ]);
                setUsuarios(usuariosData);
                setPrioridades(prioridadesData);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };
        if (show) fetchData();
    }, [show]);

    useEffect(() => {
        const fetchReportData = async () => {
            if (reportsId !== undefined) {
                try {
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
                    MySwal.fire("Error", "Hubo un error al cargar los datos del reporte", "error");
                }
            }
        };
        fetchReportData();
    }, [reportsId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "fkPrioridad" ? Number(value) : value
        });
    };
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (reportsId === undefined) {
            MySwal.fire("Error", "ID de reporte no proporcionado", "error");
            return;
        }
        try {
            await updateReports(reportsId, formData);
            MySwal.fire({
                title: "Reporte editado",
                text: "El reporte ha sido editado correctamente.",
                icon: "success",
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
            handleClose();
        } catch (error) {
            console.error("Error al actualizar el reporte:", error);
            MySwal.fire("Error", "Hubo un error al editar el reporte", "error");
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton />
            <Modal.Body>
                <Container className="my-3">
                    <h2 className="text-center mb-4">Editar Reporte</h2>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Título de reporte:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nombre"
                                        name="titulo"
                                        value={formData.titulo}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Destinatario:</Form.Label>
                                    <Form.Select
                                        name="fkDestinatario"
                                        value={formData.fkDestinatario}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value={0}>Seleccione un destinatario</option>
                                        {usuarios.map((usuario) => (
                                            <option key={usuario.idUsuarios} value={usuario.idUsuarios}>
                                                {usuario.nombre} {usuario.apellidos}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Descripción:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="descripcion"
                                        placeholder="Descripción del reporte"
                                        value={formData.descripcion}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nivel de Prioridad:</Form.Label>
                                    <Form.Select
                                        name="fkPrioridad"
                                        value={formData.fkPrioridad}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value={0}>Seleccione una prioridad</option>
                                        {prioridades.map((prioridad) => (
                                            <option key={prioridad.idPrioridad} value={prioridad.idPrioridad}>
                                                {prioridad.nombrePrioridad}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <div className="text-center mt-4">
                                    <Button variant="success" className="me-2" type="submit">
                                        Guardar
                                    </Button>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Cancelar
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default MEditReports;
