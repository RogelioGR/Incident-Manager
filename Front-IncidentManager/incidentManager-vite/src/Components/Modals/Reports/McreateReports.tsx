import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { IReportes } from '../../../Data/Interfaces/lReports';
import { createReports } from '../../../Data/Services/ReportServices';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface MCreateProps {
    show: boolean;
    handleClose: () => void;
}

const CrearReporteModal: React.FC<MCreateProps> = ({ show, handleClose }) => {
    const [reporteData, setReporteData] = useState<IReportes>({
        idReporte: 0,
        titulo: '',
        fkDestinatario: 0,
        fkPrioridad: 0,
        descripcion: '',
        fkEstado: 1,
        fechaCreada: new Date().toISOString(), 
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Convertir a número si es necesario (para fkDestinatario y fkPrioridad)
        setReporteData({
            ...reporteData,
            [name]: name === "fkDestinatario" || name === "fkPrioridad" ? parseInt(value) || 0 : value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Enviar solo los campos necesarios (sin idReporte, ya que lo genera el backend)
            await createReports({
                titulo: reporteData.titulo,
                fkDestinatario: reporteData.fkDestinatario,
                fkPrioridad: reporteData.fkPrioridad,
                descripcion: reporteData.descripcion,
                fkEstado: reporteData.fkEstado,
                fechaCreada: reporteData.fechaCreada,
            });

            MySwal.fire({
                title: "Reporte creado",
                text: "El reporte ha sido creado exitosamente",
                icon: "success",
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload(); // Recargar la página si es necesario
                }
            });

            handleClose(); // Cerrar el modal
        } catch (error) {
            console.error(error);
            MySwal.fire({
                title: "Error",
                text: "Hubo un error al crear el reporte",
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            setLoading(false);
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
            <Modal.Header closeButton>
                <Modal.Title>Crear Reporte</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Título:</Form.Label>
                        <Form.Control
                            type="text"
                            name="titulo"
                            placeholder="Título del reporte"
                            value={reporteData.titulo}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>ID del Destinatario:</Form.Label>
                        <Form.Control
                            type="number"
                            name="fkDestinatario"
                            placeholder="ID del destinatario"
                            value={reporteData.fkDestinatario}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Prioridad:</Form.Label>
                        <Form.Control
                            type="number"
                            name="fkPrioridad"
                            placeholder="Prioridad (1-5)"
                            value={reporteData.fkPrioridad}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripción:</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="descripcion"
                            placeholder="Descripción del reporte"
                            value={reporteData.descripcion}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Creando reporte...' : 'Crear Reporte'}
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CrearReporteModal;
