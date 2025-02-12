import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { IUsuario } from "../../../Data/Interfaces/IUsers";
import { obtenerUsuarioid, updateUser } from "../../../Data/Services/UsersServices";

interface MEditUserProps {
  show: boolean;
  handleClose: () => void;
  userId?: number;
}

const MySwal = withReactContent(Swal);

const MEditUser: React.FC<MEditUserProps> = ({ show, handleClose, userId }) => {
  const [formData, setFormData] = useState<IUsuario>({
    nombre: "",
    apellidos: "",
    correoElectronico: "",
    contraseña: "",
    fkDepartamento: 0,
    fkRol: 0,
  });

  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId !== undefined) {
        try {
          const userData = await obtenerUsuarioid(userId);
          console.log("userData:", userData);
          setFormData(userData);
        } catch (error) { 
          MySwal.fire("Error", "Hubo un error al cargar los datos del usuario", "error");
        }
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'contraseña') {
      setIsPasswordChanged(true);
    }

    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userId === undefined) {
      MySwal.fire("Error", "ID de usuario no proporcionado", "error");
      return;
    }

    try {
      const updatedData = { ...formData };

      if (!isPasswordChanged) {
        delete updatedData.contraseña;
      }

      await updateUser(userId, updatedData);
      MySwal.fire({
        title: "Usuario editado",
        text: "El usuario ha sido editado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      handleClose();
    } catch (error) {
      MySwal.fire("Error", "Hubo un error al editar el usuario", "error");
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
        <Container className="flex-grow-1 my-3">
          <h2 className="text-center mb-4">Editar usuario</h2>
          <Row className="justify-content-center">
            <Col md={8}>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group>
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
                    <Form.Group>
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
                <Form.Group>
                  <Form.Label>Correo electrónico:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Correo electrónico"
                    name="correoElectronico"
                    value={formData.correoElectronico}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    type="password" 
                    placeholder="Contraseña"
                    name="contraseña"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Teléfono:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Teléfono"
                        name="fkDepartamento"
                        value={formData.fkDepartamento}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Rol del usuario:</Form.Label>
                      <Form.Control
                        as="select"
                        name="fkRol"
                        value={formData.fkRol}
                        onChange={handleChange}
                      >
                        <option>Roles</option>
                        <option value={1}>Admin</option>
                        <option value={2}>Lideres</option>
                        <option value={3}>Empleado</option>
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

export default MEditUser;