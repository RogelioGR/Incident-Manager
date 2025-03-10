import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

/* Importacion services */
import { IUsuario } from "../../../Data/Interfaces/IUsers";
import { obtenerUsuarioid, updateUser } from "../../../Data/Services/UsersServices";
import { IDepartamento } from "../../../Data/Interfaces/lDepartamento";
import { GetDepartment } from "../../../Data/Services/departmentServices";

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
    correoPersonal: "",
    contraseña: "",
    fkDepartamento: 0,
    fkRol: 0,
    numEmpleado: 0,
  });

  const [departamentos, setDepartamentos] = useState<IDepartamento[]>([]);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [, setPrevPassword] = useState("");

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const departamentosData = await GetDepartment();
        setDepartamentos(departamentosData);
      } catch (error) {
        console.error("Error al obtener los departamentos:", error);
      }
    };

    const fetchUser = async () => {
      if (userId !== undefined) {
        try {
          const userData = await obtenerUsuarioid(userId);
          setFormData(userData);
          setPrevPassword(userData.contraseña || ""); // Guarda la contraseña original
        } catch (error) {
          console.error("Error al cargar los datos del usuario:", error);
          MySwal.fire("Error", "Hubo un error al cargar los datos del usuario", "error");
        }
      }
    };

    fetchDepartamentos().then(fetchUser);
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "contraseña") {
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
        delete updatedData.contraseña; // No enviar la contraseña si no ha sido cambiada
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
      console.error("Error al editar el usuario:", error);
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
                  <Form.Label>Correo Personal:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Correo electrónico"
                    name="correoPersonal"
                    value={formData.correoPersonal}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Dejar en blanco para mantener la actual"
                    name="contraseña"
                    value={formData.contraseña}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Departamento:</Form.Label>
                      <Form.Control
                        as="select"
                        name="fkDepartamento"
                        value={formData.fkDepartamento || ""}
                        onChange={handleChange}
                      >
                        <option value="">Seleccione un departamento</option>
                        {departamentos.length > 0 ? (
                          departamentos.map((dep) => (
                            <option key={dep.idDepartamento} value={dep.idDepartamento}>
                              {dep.nombreDepartamentos}
                            </option>
                          ))
                        ) : (
                          <option disabled>Cargando departamentos...</option>
                        )}
                      </Form.Control>
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
                        <option value={2}>Líderes</option>
                        <option value={3}>Empleado</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formTipo">
                      <Form.Label>Numero de Empleado:</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="000"
                        name="numEmpleado"
                        value={formData.numEmpleado}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
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

export default MEditUser;