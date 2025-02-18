/* import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Table, Form } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { GetReport } from "../Data/Services/ReportServices";
import { IReportes } from "../Data/Interfaces/lReports";

Chart.register(...registerables);

const DashboardReportes = () => {
  const [reportes, setReportes] = useState<IReportes[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const data = await GetReport();
        setReportes(data);
      } catch (error) {
        console.error("Error al obtener los reportes", error);
      }
    };
    fetchReportes();
  }, []);

  const reportesFiltrados = reportes.filter((reporte) =>
    reporte.Titulo_Reporte.toLowerCase().includes(busqueda.toLowerCase())
  );

  const estados = [...new Set(reportes.map(r => r.FK_Estado))];
  const estadoData = {
    labels: estados,
    datasets: [
      {
        label: "Cantidad de Reportes por Estado",
        data: estados.map(estado => reportes.filter(r => r.FK_Estado === estado).length),
        backgroundColor: ["#f94144", "#f9c74f", "#43aa8b"],
      },
    ],
  };

  const prioridades = [...new Set(reportes.map(r => r.FK_Prioridad))];
  const prioridadData = {
    labels: prioridades,
    datasets: [
      {
        label: "Cantidad de Reportes por Prioridad",
        data: prioridades.map(prioridad => reportes.filter(r => r.FK_Prioridad === prioridad).length),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
      },
    ],
  };

  return (
    <Container className="p-4">
      <Row className="mb-4">
        <Col className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Descargar Reporte del Mes</h4>
          <Button variant="primary">Generar PDF</Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Buscar reporte por título..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="text-center">Reportes por Estado</Card.Title>
              <div style={{ height: "200px" }}>
                <Bar data={estadoData} options={{ maintainAspectRatio: false }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="text-center">Reportes por Prioridad</Card.Title>
              <div style={{ height: "200px" }}>
                <Pie data={prioridadData} options={{ maintainAspectRatio: false }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="p-2">
        <Col>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>Reportes Recibidos</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Estado</th>
                    <th>Prioridad</th>
                  </tr>
                </thead>
                <tbody>
                  {reportesFiltrados.map((reporte) => (
                    <tr key={reporte.ID_Reportes}>
                      <td>{reporte.ID_Reportes}</td>
                      <td>{reporte.Titulo_Reporte}</td>
                      <td>{reporte.FK_Estado}</td>
                      <td>{reporte.FK_Prioridad}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardReportes;
 */