import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Table, Form } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { GetReport } from "../Data/Services/ReportServices";
import { IReportes } from "../Data/Interfaces/lReports";

Chart.register(...registerables);

/*Componentes */
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

const Dashboard: React.FC = () => {
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
    reporte.titulo?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const estados = [...new Set(reportes.map(r => r.fkEstado))];
  const estadoData = {
    labels: estados,
    datasets: [
      {
        label: "Cantidad de Reportes por Estado",
        data: estados.map(estado => reportes.filter(r => r.fkEstado === estado).length),
        backgroundColor: ["#f94144", "#f9c74f", "#43aa8b"],
      },
    ],
  };

  const reportesPorMes = reportes.reduce((acc, reporte) => {
    const mes = new Date(reporte.fechaCreada).toLocaleString('default', { month: 'long' });
    acc[mes] = (acc[mes] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mesColores = [
    "#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6", "#E6B333", 
    "#3366E6", "#999966", "#99FF99", "#B34D4D", "#80B300", "#809900"
  ];

  const reporteMesData = {
    labels: Object.keys(reportesPorMes),
    datasets: [
      {
        label: "Reportes por Mes",
        data: Object.values(reportesPorMes),
        backgroundColor: mesColores.slice(0, Object.keys(reportesPorMes).length),
      },
    ],
  };

  return (
    <>
      <div className="d-flex vh-100 flex-column flex-md-row viewinform-container">
        <Sidebar />
        <div className="flex-grow-1 d-flex flex-column viewinform-content">
          <Header />
          <Container className="p-4" style={{ overflowY: 'auto' }}>
          <h2 className="p-2">Dashboard</h2>

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
                    <Card.Title className="text-center">Reportes por Mes</Card.Title>
                    <div style={{ height: "200px" }}>
                      <Bar data={reporteMesData} options={{ maintainAspectRatio: false }} />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Descargar Reporte del Mes</h5>
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
            <Row className="p-2">
              <Col>
                <Card className="shadow">
                  <Card.Body>
                    <Card.Title>Reportes Recibidos</Card.Title>
                    <Table responsive striped bordered hover>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Título</th>
                          <th>Estado</th>
                          <th>Prioridad</th>
                          <th>Fecha Creada</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportesFiltrados.map((reporte) => (
                          <tr key={reporte.idReporte}>
                            <td>{reporte.idReporte}</td>
                            <td>{reporte.titulo}</td>
                            <td>{reporte.fkEstado}</td>
                            <td>{reporte.fkPrioridad}</td>
                            <td>{new Date(reporte.fechaCreada).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
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

export default Dashboard;
