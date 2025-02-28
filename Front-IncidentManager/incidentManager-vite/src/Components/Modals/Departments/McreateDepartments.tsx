import React, { useState } from "react";
import { Modal, Button, Row, Col, Form, Container } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";


import { IDepartamento } from "../../../Data/Interfaces/lDepartamento";
import { createDepartment } from "../../../Data/Services/departmentServices";

const MySwal = withReactContent(Swal);

interface MCreateProps {
  show: boolean;
  handleClose: () => void;
}

const MCreateDepart: React.FC<MCreateProps> = ({ show, handleClose }) => {
  const [formData, setFormData] = useState<IDepartamento>({
    nombreDepartamentos: "",
    extension: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;
     setFormData({ ...formData, [name]: value });
   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createDepartment(formData);
      MySwal.fire({
        title: "Departamento creado",
        text: "El departamento ha sido creado exitosamente",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          handleClose();
          window.location.reload();
        }
      });
      handleClose();
    } catch (error) {
      console.error(error);
      MySwal.fire("Error", "Hubo un error al crear el departamento", "error");
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
        <Modal.Title>Crear Departamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="flex-grow-1 my-5">
          <h2 className="text-center mb-4">Crear Departamento</h2>
          <Row className="justify-content-center">
            <Col md={8}>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formFirstName">
                      <Form.Label>Nombre departamento:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nombre"
                        name="nombreDepartamentos"
                        value={formData.nombreDepartamentos}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formLastName">
                      <Form.Label>Numero de Extension:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Numero de departamento"
                        name="extension"
                        value={formData.extension}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="text-center mt-4">
                  <Button variant="success" className="me-2" type="submit">
                    Guardar
                  </Button>
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={handleClose}
                  >
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

export default MCreateDepart;