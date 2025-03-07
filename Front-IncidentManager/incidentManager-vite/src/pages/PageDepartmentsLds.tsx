import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  InputGroup,
  Pagination
} from 'react-bootstrap';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

const PageDepartmentLideres = () => {
  // Datos de ejemplo
  const reportesData = [
    { id: 1001, titulo: 'Reporte Ventas Q3', prioridad: 'alta', estado: 'Enviado', progreso: 25 },
    { id: 1002, titulo: 'Auditoría TI', prioridad: 'media', estado: 'Finalizado', progreso: 100 },
    { id: 1003, titulo: 'Inventario', prioridad: 'baja', estado: 'En Proceso', progreso: 65 },
    { id: 1004, titulo: 'Seguridad', prioridad: 'alta', estado: 'No Finalizado', progreso: 40 },
    { id: 1005, titulo: 'Mantenimiento', prioridad: 'media', estado: 'Finalizado', progreso: 100 },
    { id: 1006, titulo: 'Capacitación', prioridad: 'baja', estado: 'En Proceso', progreso: 75 },
    { id: 1007, titulo: 'Evaluación', prioridad: 'alta', estado: 'No Finalizado', progreso: 30 }
  ];

  const empleadosData = [
    { id: 1, nombre: 'Carlos Gómez', rol: 'Analista', reportesAsignados: 5 },
    { id: 2, nombre: 'Ana Torres', rol: 'Supervisor', reportesAsignados: 3 },
    { id: 3, nombre: 'Luis Pérez', rol: 'Desarrollador', reportesAsignados: 8 },
    { id: 4, nombre: 'María López', rol: 'Diseñador', reportesAsignados: 2 },
    { id: 5, nombre: 'Jorge Ramírez', rol: 'Tester', reportesAsignados: 6 },
    { id: 6, nombre: 'Sofía Martínez', rol: 'Gerente', reportesAsignados: 4 },
    { id: 7, nombre: 'Pedro Sánchez', rol: 'Soporte', reportesAsignados: 7 }
  ];

  // Estados de filtros y paginación
  const [searchId, setSearchId] = useState('');
  const [filterPrioridad, setFilterPrioridad] = useState('todos');
  const [currentPageReports, setCurrentPageReports] = useState(1);
  const [currentPageEmpleados, setCurrentPageEmpleados] = useState(1);

  // Filtrado de reportes
  const filteredReports = reportesData.filter(report => 
    report.id.toString().includes(searchId) &&
    (filterPrioridad === 'todos' || report.prioridad === filterPrioridad)
  );

  // Lógica de paginación para reportes
  const reportsPerPage = 6;
  const totalPagesReports = Math.ceil(filteredReports.length / reportsPerPage);
  const paginatedReports = filteredReports.slice(
    (currentPageReports - 1) * reportsPerPage,
    currentPageReports * reportsPerPage
  );

  // Lógica de paginación para empleados
  const empleadosPerPage = 6;
  const totalPagesEmpleados = Math.ceil(empleadosData.length / empleadosPerPage);
  const paginatedEmpleados = empleadosData.slice(
    (currentPageEmpleados - 1) * empleadosPerPage,
    currentPageEmpleados * empleadosPerPage
  );

  // Resetear página al cambiar filtros
  useEffect(() => {
    setCurrentPageReports(1);
  }, [searchId, filterPrioridad]);

  return (
    <div className="d-flex vh-100 flex-column flex-md-row viewinform-container">
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column viewinform-content">
        <Header />
        <Container className="my-3 flex-grow-1" style={{ overflowY: 'auto' }}>
          {/* Filtros */}
          <Row className="mb-4">
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="search"
                  placeholder="Buscar por ID de reporte"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <Form.Select
                value={filterPrioridad}
                onChange={(e) => setFilterPrioridad(e.target.value)}
              >
                <option value="todos">Todas las prioridades</option>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Tabla de Reportes */}
          <Row className="mb-4">
            <Col>
              <h3 className="mb-3">Reportes del Departamento</h3>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Título</th>
                      <th>Prioridad</th>
                      <th>Progreso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedReports.map((report) => (
                      <tr key={report.id}>
                        <td>{report.id}</td>
                        <td>{report.titulo}</td>
                        <td>
                          <span
                            className={`badge ${
                              report.prioridad === 'alta' ? 'bg-danger' :
                              report.prioridad === 'media' ? 'bg-warning' :
                              'bg-info'
                            }`}
                          >
                            {report.prioridad.charAt(0).toUpperCase() + report.prioridad.slice(1)}
                          </span>
                        </td>
                        <td>
                          <div className="progress" style={{ height: '20px' }}>
                            <div
                              className={`progress-bar ${
                                report.estado === 'No Finalizado' ? 'bg-danger' :
                                report.estado === 'En Proceso' ? 'bg-warning' :
                                'bg-success'
                              }`}
                              role="progressbar"
                              style={{ width: `${report.progreso}%` }}
                              aria-valuenow={report.progreso}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              {report.progreso}%
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              {/* Paginación Reportes */}
              <Pagination className="mb-4">
                {[...Array(totalPagesReports)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPageReports}
                    onClick={() => setCurrentPageReports(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Col>
          </Row>

          {/* Tabla de Empleados */}
          <Row>
            <Col>
              <h3 className="mb-3">Empleados del Departamento</h3>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Rol</th>
                      <th>Reportes Asignados</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedEmpleados.map((emp) => (
                      <tr key={emp.id}>
                        <td>{emp.id}</td>
                        <td>{emp.nombre}</td>
                        <td>{emp.rol}</td>
                        <td>{emp.reportesAsignados}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              {/* Paginación Empleados */}
              <Pagination>
                {[...Array(totalPagesEmpleados)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPageEmpleados}
                    onClick={() => setCurrentPageEmpleados(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default PageDepartmentLideres;