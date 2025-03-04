import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

/* Importacion services */
import { IReportes } from "../../../Data/Interfaces/lReports";
import { GetReportid, updateReports } from "../../../Data/Services/ReportServices";


interface MEditProps {
    show: boolean;
    handleClose: () => void;
    reportsId?: number;
}

const MySwal = withReactContent(Swal);

const MEditReports: React.FC<MEditProps> = ({ show, handleClose, reportsId }) => {
    const [formData, setFormData] = useState<IReportes>({
        titulo: "",
        fkDestinatario: 0,
        fkPrioridad: 0,
        descripcion: ""
    });

    useEffect(() => {
        const fetchDepartment = async () => {
            if (reportsId !== undefined) {
                try {
                    const userData = await GetReportid(reportsId);
                    if (userData) {
                        setFormData({
                            titulo: userData.titulo || "",
                            descripcion: userData.descripcion || "",
                            fkDestinatario: userData.fkDestinatario || 0,
                            fkPrioridad: userData.fkPrioridad || 0,
                            fkEstado: userData.fkEstado || 0
                        });
                    }
                } catch (error) {
                    console.error("Error al cargar los datos del reporte:", error);
                    MySwal.fire("Error", "Hubo un error al cargar los datos del reporte", "error");
                }
            }
        };
        fetchDepartment();
    }, [reportsId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "extension" ? Number(value) : value
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
                title: "reporte editado",
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
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton />
            <Modal.Body>
                <Container className="flex-grow-1 my-3">
                    <h2 className="text-center mb-4">Editar Reporte</h2>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Form.Group>
                                        <Form.Label>Titulo de reporte:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nombre"
                                            name="titulo"
                                            value={formData.titulo}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group>
                                        <Form.Label>Destinatario:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Nombre"
                                            name="fkDestinatario"
                                            value={formData.fkDestinatario}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Row>
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
                                <Row>
                                    <Form.Group>
                                        <Form.Label>nivel de prioridad:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Extensión"
                                            name="fkPrioridad"
                                            value={formData.fkPrioridad}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Row>
                                <div className="text-center mt-4">
                                    <Button variant="success" className="me-2" type="submit">
                                        Guardar
                                    </Button>
                                    <Button variant="secondary" className="me-2" onClick={handleClose}>
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
