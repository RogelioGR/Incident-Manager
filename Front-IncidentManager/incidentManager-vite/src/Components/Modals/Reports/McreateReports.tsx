import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { IReportes } from '../../../Data/Interfaces/lReports';
import { IUsuario } from '../../../Data/Interfaces/IUsers';
import { Iprioridad } from '../../../Data/Interfaces/lPrioridad';
import { createReports } from '../../../Data/Services/ReportServices';
import { obtenerUsuarios } from '../../../Data/Services/UsersServices';
import { GetPriority } from '../../../Data/Services/priorityServices';

interface MCreateProps {
    show: boolean;
    handleClose: () => void;
}
const MySwal = withReactContent(Swal);

const CrearReporteModal: React.FC<MCreateProps> = ({ show, handleClose }) => {
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [prioridades, setPrioridades] = useState<Iprioridad[]>([]);
    const [selectedDestinatarioId, setSelectedDestinatarioId] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    const [reporteData, setReporteData] = useState<IReportes>({
        titulo: '',
        fkPrioridad: 0,
        descripcion: '',
        fkEstado: 1,
        fechaCreada: new Date().toISOString(),
    });

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const usuariosData = await obtenerUsuarios();
                setUsuarios(usuariosData);
            } catch (error) {
                console.error("Error al obtener la lista de usuarios:", error);
            }
        };
        const fetchPrioridades = async () => {
            try {
                const prioridadesData = await GetPriority();
                setPrioridades(prioridadesData);
            } catch (error) {
                console.error("Error al obtener la lista de prioridades:", error);
            }
        };
        if (show) {
            fetchUsuarios();
            fetchPrioridades();
        }
    }, [show]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setReporteData({
            ...reporteData,
            [name]: name === "fkPrioridad" ? parseInt(value) || 0 : value,
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createReports({
                titulo: reporteData.titulo,
                fkDestinatario: selectedDestinatarioId,
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
                    window.location.reload();
                }
            });

            handleClose();
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
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
            <Container className="flex-grow-1 my-3">
            <h2 className="text-center mb-4">Crear Reporte</h2>

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
                        <Form.Label>Destinatario:</Form.Label>
                        <Form.Select
                            name="fkDestinatario"
                            value={selectedDestinatarioId}
                            onChange={(e) => setSelectedDestinatarioId(parseInt(e.target.value))}
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
                        <Form.Label>Prioridad:</Form.Label>
                        <Form.Select
                            name="fkPrioridad"
                            value={reporteData.fkPrioridad}
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
                    <div className="text-center mt-4">
         
                    <Button variant="success" className="me-2" type="submit" disabled={loading}>
                        {loading ? 'Creando reporte...' : 'Crear Reporte'}
                    </Button>
                    <Button variant="secondary" className="me-2" onClick={handleClose}>Cerrar</Button>
        </div>

                </Form>
       </Container>
            </Modal.Body>
        </Modal>
    );
};

export default CrearReporteModal;
