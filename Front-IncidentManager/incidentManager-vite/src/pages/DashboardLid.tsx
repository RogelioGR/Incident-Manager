import React from "react";
import { Container, Row, Col, Card, Table, Button, ListGroup } from "react-bootstrap";

/* Componentes */
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import GraficoReportes from "../Components/GraficoReportes";

const DashboardLideres: React.FC = () => {
  const reportesResueltos = 12;
  const reportesPendientes = 5;

  const datosDesempeño = {
    labels: ["Resueltos", "Pendientes"],
    datasets: [
      {
        label: "Estado de Reportes",
        data: [reportesResueltos, reportesPendientes],
        backgroundColor: ["#43aa8b", "#f94144"],
      },
    ],
  };

  const miembros = [
    { idUsuario: 1, nombre: "Juan Pérez", email: "juan@example.com" },
    { idUsuario: 2, nombre: "María López", email: "maria@example.com" },
    { idUsuario: 3, nombre: "Carlos Gómez", email: "carlos@example.com" },
  ];

  const reportes = [
    { idReporte: 101, titulo: "Falla en servidor", estado: "Pendiente", prioridad: "Alta" },
    { idReporte: 102, titulo: "Error en aplicación", estado: "Resuelto", prioridad: "Media" },
    { idReporte: 103, titulo: "Problema de red", estado: "Pendiente", prioridad: "Alta" },
  ];

  const comentarios = [
    "Se resolvió el problema de acceso.",
    "Pendiente revisar el servidor principal.",
    "Actualización de software completada.",
  ];

  return (
    <>
      <div className="d-flex vh-100 flex-column flex-md-row viewinform-container">
        <Sidebar />
        <div className="flex-grow-1 d-flex flex-column viewinform-content">
          <Header />
          <Container className="my-3" style={{ overflowY: "auto" }}>
            <h1 className="mb-2">Dashboard Líderes</h1>

            <Row className="mb-4">
              <Col md={6}>
                <Card className="shadow">
                  <Card.Body>
                    <GraficoReportes title="Desempeño del Equipo" data={datosDesempeño} />
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="shadow">
                  <Card.Body>
                    <Card.Title>Reportes Recientes</Card.Title>
                    <Table responsive striped bordered hover>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Título</th>
                          <th>Estado</th>
                          <th>Prioridad</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportes.map((reporte) => (
                          <tr key={reporte.idReporte}>
                            <td>{reporte.idReporte}</td>
                            <td>{reporte.titulo}</td>
                            <td>{reporte.estado}</td>
                            <td>{reporte.prioridad}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Card className="shadow">
                  <Card.Body>
                    <Card.Title>Miembros del Equipo</Card.Title>
                    <Table responsive striped bordered hover>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {miembros.map((miembro) => (
                          <tr key={miembro.idUsuario}>
                            <td>{miembro.idUsuario}</td>
                            <td>{miembro.nombre}</td>
                            <td>{miembro.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="shadow">
                  <Card.Body>
                    <Card.Title>Comentarios Recientes</Card.Title>
                    <ListGroup>
                      {comentarios.map((comentario, index) => (
                        <ListGroup.Item key={index}>{comentario}</ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default DashboardLideres;