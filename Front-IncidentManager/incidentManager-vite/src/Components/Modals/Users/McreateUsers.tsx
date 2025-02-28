import React, { useState } from "react";
import { Modal, Button, Row, Col, Form, Container } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

import { createUser } from "../../../Data/Services/UsersServices";
import { IUsuario } from "../../../Data/Interfaces/IUsers";

const MySwal = withReactContent(Swal);

interface MCreateUserProps {
  show: boolean;
  handleClose: () => void;
}

const MCreateUser: React.FC<MCreateUserProps> = ({ show, handleClose }) => {
  const [formData, setFormData] = useState<IUsuario>({
    nombre: "",
    apellidos: "",
    correoElectronico: "",
    contraseña: "",
    fkDepartamento: 0,
    fkRol: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.contraseña!.length < 8) {
      MySwal.fire(
        "Error",
        "La contraseña debe tener al menos 8 caracteres.",
        "error"
      );
      return;
    }

    try {
      await createUser(formData);
      MySwal.fire({
        title: "Usuario creado",
        text: "El usuario ha sido creado exitosamente",
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
      MySwal.fire("Error", "Hubo un error al crear el usuario", "error");
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
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="flex-grow-1 my-5">
          <h2 className="text-center mb-4">Crear usuario</h2>
          <Row className="justify-content-center">
            
            <Col md={8}>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formFirstName">
                      <Form.Label>Nombre:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formLastName">
                      <Form.Label>Apellido:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Apellido"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="formEmail">
                  <Form.Label>Correo electrónico:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Correo electrónico"
                    name="correoElectronico"
                    value={formData.correoElectronico}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    name="contraseña"
                    value={formData.contraseña}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formPhone">
                      <Form.Label>Departamento:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Departamento"
                        name="fkDepartamento"
                        value={formData.fkDepartamento}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formEmployeeNumber">
                      <Form.Label>ROL del usuario:</Form.Label>
                      <Form.Control
                        as="select"
                        name="fkRol"
                        value={formData.fkRol}
                        onChange={handleChange}
                      >
                        <option>Roles</option>
                        <option value={1}>Administrador</option>
                        <option value={2}>Lideres</option>
                        <option value={3}>Empleados</option>
                      </Form.Control>
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

export default MCreateUser;