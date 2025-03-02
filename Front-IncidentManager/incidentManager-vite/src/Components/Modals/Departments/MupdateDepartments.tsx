import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

/* Importacion services */
import { IDepartamento } from "../../../Data/Interfaces/lDepartamento";
import { GetDepartmentId, updateDepartment } from "../../../Data/Services/departmentServices";

interface MEditProps {
  show: boolean;
  handleClose: () => void;
  departId?: number;
}

const MySwal = withReactContent(Swal);

const MEditDepartment: React.FC<MEditProps> = ({ show, handleClose, departId }) => {
  const [formData, setFormData] = useState<IDepartamento>({
    nombreDepartamentos: "",
    extension: 0
  });

  useEffect(() => {
    const fetchDepartment = async () => {
      if (departId !== undefined) {
        try {
          const userData = await GetDepartmentId(departId);
          if (userData) {
            setFormData({
              nombreDepartamentos: userData.nombreDepartamentos || "",
              extension: userData.extension || 0
            });
          }
        } catch (error) {
          console.error("Error al cargar los datos del departamento:", error);
          MySwal.fire("Error", "Hubo un error al cargar los datos del departamento", "error");
        }
      }
    };

    fetchDepartment();
  }, [departId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "extension" ? Number(value) : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (departId === undefined) {
      MySwal.fire("Error", "ID de departamento no proporcionado", "error");
      return;
    }

    try {
      await updateDepartment(departId, formData);
      MySwal.fire({
        title: "Departamento editado",
        text: "El departamento ha sido editado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      handleClose();
    } catch (error) {
      console.error("Error al actualizar el departamento:", error);
      MySwal.fire("Error", "Hubo un error al editar el departamento", "error");
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
          <h2 className="text-center mb-4">Editar Departamento</h2>
          <Row className="justify-content-center">
            <Col md={8}>
              <Form onSubmit={handleSubmit}>
                <Row>
                    <Form.Group>
                      <Form.Label>Nombre del departamento:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nombre"
                        name="nombreDepartamentos"
                        value={formData.nombreDepartamentos}
                        onChange={handleChange}
                      />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group>
                      <Form.Label>Numero de Extension:</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Extensión"
                        name="extension"
                        value={formData.extension}
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

export default MEditDepartment;
