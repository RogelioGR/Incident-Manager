import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Table, Form } from "react-bootstrap";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Registrar módulos de Chart.js
Chart.register(...registerables);

const Dashboardprueba = () => {
  // Datos de incidentes por estado
  const incidentesPorEstado = [
    { estado: "Pendiente", cantidad: 15 },
    { estado: "En Proceso", cantidad: 10 },
    { estado: "Resuelto", cantidad: 25 },
  ];

  // Datos de incidentes por mes
  const incidentesPorMes = [
    { mes: "Enero", cantidad: 5 },
    { mes: "Febrero", cantidad: 7 },
    { mes: "Marzo", cantidad: 12 },
    { mes: "Abril", cantidad: 9 },
    { mes: "Mayo", cantidad: 15 },
    { mes: "Junio", cantidad: 18 },
  ];

  // Datos de incidentes por departamento (para gráfica de pastel)
  const incidentesPorDepartamento = [
    { departamento: "TI", cantidad: 30 },
    { departamento: "Redes", cantidad: 15 },
    { departamento: "Seguridad", cantidad: 10 },
    { departamento: "Soporte", cantidad: 20 },
    { departamento: "Administración", cantidad: 5 },
  ];

  // Datos de reportes recibidos (con nivel de prioridad)
  const [reportesRecibidos, setReportesRecibidos] = useState([
    { id: 1, titulo: "Error en servidor", estado: "Pendiente", prioridad: "Alta" },
    { id: 2, titulo: "Fallo en red", estado: "En Proceso", prioridad: "Media" },
    { id: 3, titulo: "Software no responde", estado: "Resuelto", prioridad: "Baja" },
    { id: 4, titulo: "Pérdida de datos", estado: "Pendiente", prioridad: "Alta" },
    { id: 5, titulo: "Falla en autenticación", estado: "En Proceso", prioridad: "Media" },
  ]);

  // Estado para búsqueda
  const [busqueda, setBusqueda] = useState("");

  // Filtrar y ordenar reportes por título y prioridad (Alta → Media → Baja)
  const reportesFiltrados = reportesRecibidos
    .filter((reporte) =>
      reporte.titulo.toLowerCase().includes(busqueda.toLowerCase())
    )
    .sort((a, b) => {
      const prioridadOrden = { Alta: 1, Media: 2, Baja: 3 };
      return prioridadOrden[a.prioridad] - prioridadOrden[b.prioridad];
    });

  // Tarjetas resumen (KPIs)
  const totalReportes = reportesRecibidos.length;
  const reportesPendientes = reportesRecibidos.filter(r => r.estado === "Pendiente").length;
  const reportesEnProceso = reportesRecibidos.filter(r => r.estado === "En Proceso").length;
  const reportesResueltos = reportesRecibidos.filter(r => r.estado === "Resuelto").length;

  // Configuración del gráfico de barras (Incidentes por Estado)
  const barData = {
    labels: incidentesPorEstado.map(item => item.estado),
    datasets: [
      {
        label: "Cantidad de Incidentes",
        data: incidentesPorEstado.map(item => item.cantidad),
        backgroundColor: ["#f94144", "#f9c74f", "#43aa8b"],
      },
    ],
  };

  // Calcular datos para "Incidentes por Prioridad" a partir de reportesRecibidos
  const prioridadCounts = reportesRecibidos.reduce((acc, reporte) => {
    acc[reporte.prioridad] = (acc[reporte.prioridad] || 0) + 1;
    return acc;
  }, {});
  const prioridades = ["Alta", "Media", "Baja"];
  const prioridadData = {
    labels: prioridades,
    datasets: [
      {
        label: "Incidentes por Prioridad",
        data: prioridades.map(p => prioridadCounts[p] || 0),
        backgroundColor: ["#f94144", "#f9c74f", "#43aa8b"],
      },
    ],
  };

  // Configuración del gráfico de pastel (Incidentes por Departamento)
  const pieData = {
    labels: incidentesPorDepartamento.map(item => item.departamento),
    datasets: [
      {
        label: "Incidentes por Departamento",
        data: incidentesPorDepartamento.map(item => item.cantidad),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"],
      },
    ],
  };

  // Configuración del gráfico de línea (Incidentes por Mes)
  const lineData = {
    labels: incidentesPorMes.map(item => item.mes),
    datasets: [
      {
        label: "Incidentes por Mes",
        data: incidentesPorMes.map(item => item.cantidad),
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <Container className="p-4">
  

      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="text-center">Incidentes por Estado</Card.Title>
              <div style={{ height: "200px" }}>
                <Bar data={barData} options={{ maintainAspectRatio: false }} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="text-center">Incidentes por Departamento</Card.Title>
              <div style={{ height: "200px" }}>
                <Pie data={pieData} options={{ maintainAspectRatio: false }} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="text-center">Incidentes por Mes</Card.Title>
              <div style={{ height: "200px" }}>
                <Line data={lineData} options={{ maintainAspectRatio: false }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

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
                    <tr key={reporte.id}>
                      <td>{reporte.id}</td>
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
    </Container>
  );
};

export default Dashboardprueba;
