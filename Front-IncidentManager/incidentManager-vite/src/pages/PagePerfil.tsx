import React from 'react';
import { Container, Card, Row, Col, Form, Button, Badge  } from 'react-bootstrap';


/*Componentes */
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

const PagePerfil: React.FC = () => {
  return (
    <>
      <div className="d-flex vh-100 flex-column flex-md-row viewinform-container">
        <Sidebar />
        <div className="flex-grow-1 d-flex flex-column viewinform-content">
          <Header />
          <Container className="my-3" style={{ overflowY: 'auto' }}>
      {/* Tarjeta principal */}
      <Card className="border-0 shadow-lg rounded-3 overflow-hidden mb-4">
        <Card.Header className="bg-gradient bg-secondary text-white p-4">
          <div>
            <h4 className="mb-0">Información Personal</h4>
            <small>Todos los campos marcados con <Badge bg="warning" className="px-2">*</Badge> son obligatorios</small>
          </div>
        </Card.Header>
        <Card.Body className="p-4">
          <Form>
            <h5 className="border-bottom pb-2 mb-4">Datos básicos</h5>
            
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group className="mb-3 position-relative">
                  <Form.Label className="fw-bold">
                    Nombre <Badge bg="warning" className="px-2">*</Badge>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    placeholder="Ingrese nombre"
                    className="rounded-3"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">
                    Apellidos <Badge bg="warning" className="px-2">*</Badge>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="apellidos"
                    placeholder="Ingrese apellidos"
                    className="rounded-3"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <h5 className="border-bottom pb-2 mb-4">Información de contacto</h5>
            
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">
                    Correo Electrónico <Badge bg="warning" className="px-2">*</Badge>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="correoElectronico"
                    placeholder="ejemplo@empresa.com"
                    className="rounded-3"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Correo Personal</Form.Label>
                  <Form.Control
                    type="email"
                    name="correoPersonal"
                    placeholder="ejemplo@gmail.com"
                    className="rounded-3"
                  />
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
                  >
                    <option value="0">Seleccione un departamento</option>
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
                    Rol <Badge bg="warning" className="px-2">*</Badge>
                  </Form.Label>
                  <Form.Select 
                    name="fkRol" 
                    className="rounded-3"
                  >
                    <option value="0">Seleccione un rol</option>
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
              />
              <Form.Text className="text-muted">
                Completar solo si desea cambiar su contraseña actual
              </Form.Text>
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-center gap-3 mt-4 p-2">
       
       <Button variant="secondary" >Cerrar</Button>
       <Button variant="success" >Guardar cambios</Button>
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
