import React, { useState } from "react";
import { Modal, Button, Row, Col, Form, Container } from "react-bootstrap";
import withReactContent from "sweetalert2-react-content";
import Swal from 'sweetalert2';

/* Importacion Services */
import { IDepartamento } from "../../../Data/Interfaces/lDepartamento";
import { createDepartment } from "../../../Data/Services/departmentServices";

const MySwal = withReactContent(Swal);

interface MCreateProps {
  show: boolean;
  handleClose: () => void;
}

const MCreateDepart: React.FC<MCreateProps> = ({ show, handleClose }) => {

  const [departmentData, setDepartmentData] = useState<IDepartamento>({
    nombreDepartamentos: "",
    extension: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDepartmentData({
      ...departmentData,
      [name]: name === "extension" ? String(value) || 0 : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createDepartment(departmentData);
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
      </Modal.Header>
      <Modal.Body>
        <Container className="flex-grow-1 my-5">
          <h2 className="text-center mb-4">Crear departamento</h2>
          <Row className="justify-content-center">
            <Col md={8}>
              <Form onSubmit={handleSubmit}>
                <Row>

                  <Form.Group controlId="formFirstName">
                    <Form.Label>Nombre departamento:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombre"
                      name="nombreDepartamentos"
                      value={departmentData.nombreDepartamentos}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formLastName">
                    <Form.Label>Numero de Extension:</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Numero"
                      name="extension"
                      value={departmentData.extension}
                      onChange={handleChange}
                    />
                  </Form.Group>
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