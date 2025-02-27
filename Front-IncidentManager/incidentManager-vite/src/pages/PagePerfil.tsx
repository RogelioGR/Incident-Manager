import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';

/* Importacion de services */
import { IUsuario } from '../Data/Interfaces/IUsers';
import { obtenerUsuarioid } from '../Data/Services/UsersServices';

/* Componentes */
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

const PagePerfil: React.FC = () => {
  const [usuario, setUsuario] = useState<IUsuario | null>(null);

  useEffect(() => {
    const idUsuario = localStorage.getItem('idUsuarios');
    if (idUsuario && !isNaN(Number(idUsuario))) {
      obtenerUsuarioid(Number(idUsuario))
        .then((data) => {
          if (data) {
            setUsuario(data);
          }
        })
        .catch((error) => {
          console.error('Error al obtener la información del usuario:', error);
        });
    }
  }, []);

  return (
    <>
      <div className="d-flex vh-100 flex-column flex-md-row viewinform-container">
        <Sidebar />
        <div className="flex-grow-1 d-flex flex-column viewinform-content">
          <Header />
          <Container className="my-3" style={{ overflowY: 'auto' }}>
            <Card className="border-0 shadow-lg rounded-3 overflow-hidden mb-4">
              <Card.Header className="bg-gradient bg-secondary text-white p-4">
                <div>
                  <h4 className="mb-0">Información Personal</h4>
                </div>
              </Card.Header>
              <Card.Body className="p-4">
                <Form>
                  <h5 className="border-bottom pb-2 mb-4">Datos básicos</h5>

                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group className="mb-3 position-relative">
                        <Form.Label className="fw-bold">
                          Nombre 
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="nombre"
                          placeholder="Ingrese nombre"
                          className="rounded-3"
                          value={usuario?.nombre ?? ''}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">
                          Apellidos 
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="apellidos"
                          placeholder="Ingrese apellidos"
                          className="rounded-3"
                          value={usuario?.apellidos ?? ''}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <h5 className="border-bottom pb-2 mb-4">Información de contacto</h5>
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">
                          Correo Electrónico 
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="correoElectronico"
                          placeholder="ejemplo@empresa.com"
                          className="rounded-3"
                          value={usuario?.correoElectronico ?? ''}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">
                          Correo Personal 
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="correoPersonal"
                          placeholder="ejemplo@gmail.com"
                          className="rounded-3"
                          value={usuario?.correoPersonal ?? ''}
                          readOnly
                        />
                        <Form.Text className="text-muted">
                        Agrega tu correo para recibir notificaciones
                    </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>
                  <h5 className="border-bottom pb-2 mb-4">Datos organizacionales</h5>

                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Departamento</Form.Label>
                        <Form.Select 
                          name="fkDepartamento" 
                          className="rounded-3"
                          value={usuario?.fkDepartamento ?? ''}
                          disabled
                        >
                          <option value="">Seleccione un departamento</option>
                          <option value="1">Administración</option>
                          <option value="2">Desarrollo</option>
                          <option value="3">Marketing</option>
                          <option value="4">Recursos Humanos</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">
                          Rol
                        </Form.Label>
                        <Form.Select 
                          name="fkRol" 
                          className="rounded-3"
                          value={usuario?.fkRol ?? ''}
                          disabled
                        >
                          <option value="">Seleccione un rol</option>
                          <option value="1">Administrador</option>
                          <option value="2">Usuario</option>
                          <option value="3">Supervisor</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <h5 className="border-bottom pb-2 mb-4">Seguridad</h5>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="contraseña"
                      placeholder="Dejar en blanco para mantener la actual"
                      className="rounded-3"
                      readOnly
                    />
                    <Form.Text className="text-muted">
                      Completar solo si desea cambiar su contraseña actual
                    </Form.Text>
                  </Form.Group>
                </Form>
                <div className="d-flex justify-content-center gap-3 mt-4 p-2">
                  <Button variant="secondary">Cerrar</Button>
                  <Button variant="success">Guardar cambios</Button>
                </div>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div>
    </>
  );
};

export default PagePerfil;
