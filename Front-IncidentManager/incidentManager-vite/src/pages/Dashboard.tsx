import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Table, Form } from "react-bootstrap";
import { Chart, registerables } from "chart.js";
import { PDFDownloadLink } from "@react-pdf/renderer";

/* Services */
import { IReportes } from "../Data/Interfaces/lReports";
import { GetReport } from "../Data/Services/ReportServices";
import { Iprioridad } from "../Data/Interfaces/lPrioridad";
import { GetPriority } from "../Data/Services/priorityServices";

/*Componentes */
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import ReportPDF from "../Components/ReportPDF";
import GraficoReportes from "../Components/GraficoReportes"; 

/* importacion de las graficas */
Chart.register(...registerables);

const Dashboard: React.FC = () => {
  const [reportes, setReportes] = useState<IReportes[]>([]);
  const [prioridades, setPrioridades] = useState<Iprioridad[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    /* LLama a la funcion de la WebApi de reporte */
    const fetchReportes = async () => {
      try {
        const data = await GetReport();
        setReportes(data);
      } catch (error) {
        console.error("Error al obtener los reportes", error);
      }
    };
    /* LLama a la funcion de la WebApi de prioridad */
    const fetchPrioridades = async () => {
      try {
        const data = await GetPriority();
        setPrioridades(data);
      } catch (error) {
        console.error("Error al obtener las prioridades", error);
      }
    };

    fetchReportes();
    fetchPrioridades();
  }, []);

  /* funcion de busqueda de titulo de reporte */
  const reportesFiltrados = reportes.filter((reporte) =>
    reporte.titulo?.toLowerCase().includes(busqueda.toLowerCase())
  );

  /* Obtener el nombre de la prioridad */
  const getNombrePrioridad = (fkPrioridad: number) => {
    const prioridad = prioridades.find((p) => p.idPrioridad === fkPrioridad);
    return prioridad ? prioridad.nombrePrioridad : "Desconocido";
  };

  /*  extrae los valores de FkPrioridad */
  const prioridadesIds = [...new Set(reportes.map((r) => r.fkPrioridad))];
  const prioridadData = {
    labels: prioridadesIds.map((id) => getNombrePrioridad(id)),
    datasets: [
      {
        label: "Cantidad de Reportes por Prioridad",
        data: prioridadesIds.map(
          (id) => reportes.filter((r) => r.fkPrioridad === id).length
        ),
        backgroundColor: ["#f94144", "#f9c74f", "#43aa8b"],
      },
    ],
  };
  /*  extrae los valores de fechacreada  */

  const mesesOrdenados = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const reportesPorMes = reportes.reduce((acc, reporte) => {
    const mes = new Date(reporte.fechaCreada).toLocaleString("default", {
      month: "long",
    });
    acc[mes] = (acc[mes] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const reportesPorMesOrdenados = Object.keys(reportesPorMes)
  .sort((a, b) => mesesOrdenados.indexOf(a) - mesesOrdenados.indexOf(b));

  const mesColores = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
  ];

  const reporteMesData = {
    labels: reportesPorMesOrdenados,
    datasets: [
      {
        label: "Reportes por Mes",
        data: reportesPorMesOrdenados.map((mes) => reportesPorMes[mes]),
        backgroundColor: mesColores.slice(0, reportesPorMesOrdenados.length),
      },
    ],
  };
  

  return (
    <>
      <div className="d-flex vh-100 flex-column flex-md-row viewinform-container">
        <Sidebar />
        <div className="flex-grow-1 d-flex flex-column viewinform-content">
          <Header />
          <Container className="p-4" style={{ overflowY: "auto" }}>
            <h2 className="reports-title m-2">Dashboard</h2>

            <Row className="mb-4">
            <Col md={6}>
                <Card className="shadow">
                  <Card.Body>
                  <GraficoReportes title="Reportes por Prioridad" data={prioridadData} />
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="shadow">
                  <Card.Body>
                  <GraficoReportes title="Reportes por Mes" data={reporteMesData} />

                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {/* Botón para descargar el PDF */}
            <Row className="mb-4">
              <Col className="d-flex justify-content-between align-items-center">
                <h5>Descargar Reporte del Mes</h5>
                <PDFDownloadLink
                  document={<ReportPDF reportes={reportesFiltrados} />}
                  fileName="Reporte_Incidentes.pdf"
                >
                  {({ loading }) => (
                    <Button variant="primary">
                      {loading ? "Generando PDF..." : "Descargar PDF"}
                    </Button>
                  )}
                </PDFDownloadLink>
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
                            <td>{getNombrePrioridad(reporte.fkPrioridad ) }</td>
                            <td>
                              {new Date(
                                reporte.fechaCreada
                              ).toLocaleDateString()}
                            </td>
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
