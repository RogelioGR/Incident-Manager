import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Pagination, Dropdown } from 'react-bootstrap';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

const DashboardLideres = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  const [userReports, setUserReports] = useState([
    { id: 1001, name: 'Reporte de ventas Q3', priority: 'Alta', date: '2024-03-15' },
    { id: 1002, name: 'Análisis de mercado', priority: 'Media', date: '2024-03-20' },
    { id: 1003, name: 'Informe financiero', priority: 'Urgente', date: '2024-03-25' },
    { id: 1004, name: 'Proyección anual', priority: 'Media', date: '2024-04-01' },
    { id: 1005, name: 'Auditoría interna', priority: 'Alta', date: '2024-04-05' },
    { id: 1006, name: 'Plan de expansión', priority: 'Urgente', date: '2024-04-10' },
  ]);

  const handleDeleteReport = (id) => {
    const updatedReports = userReports.filter(report => report.id !== id);
    setUserReports(updatedReports);
    
    const newTotalPages = Math.ceil(updatedReports.length / itemsPerPage);
    if (currentPage > newTotalPages) setCurrentPage(newTotalPages);
  };

  const filteredReports = userReports.filter(report => 
    report.id.toString().includes(searchTerm)
  );
  
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="d-flex vh-100 flex-column flex-md-row viewinform-container" 
         style={{ backgroundColor: '#f8f9fa' }}>
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column viewinform-content">
        <Header />
        <Container fluid className="my-3 flex-grow-1 px-4 py-3" 
                   style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h1 className="mb-4 ">Dashboard Líder</h1>

          <section className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h4 mb-0 text-secondary">Reportes Recibidos</h2>
              <div style={{ maxWidth: '300px' }}>
                <Form.Control
                  type="text"
                  placeholder="Buscar por ID de reporte..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="rounded-pill border-1"
                  style={{ borderColor: '#ced4da' }}
                />
              </div>
            </div>

            {paginatedReports.length > 0 ? (
              <Row xs={1} md={2} lg={4} className="g-4">
                {paginatedReports.map(report => (
                  <Col key={report.id}>
                    <Card className="h-100 border-0 shadow-sm rounded-3 overflow-hidden"     
                          style={{ transition: 'transform 0.2s', cursor: 'pointer', backgroundColor: '#f0f2f5'  }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <span className={`badge bg-${report.priority === 'Urgente' ? 'danger' : report.priority === 'Alta' ? 'warning' : 'info'}`} 
                                style={{ fontSize: '0.8rem' }}>
                            {report.priority}
                          </span>
                          <Dropdown>
                            <Dropdown.Toggle variant="light" 
                                            className="p-2  shadow-sm"
                                            style={{ backgroundColor: '#f0f2f5' }}>
                              ...
                            </Dropdown.Toggle>
                            <Dropdown.Menu align="end">
                              <Dropdown.Item onClick={() => handleDeleteReport(report.id)} 
                                             className="text-danger">
                                Eliminar reporte
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <Card.Title className="h5 mb-3 text-truncate">{report.name}</Card.Title>
                        <Card.Text className="text-muted small mb-0">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="text-truncate">{report.date}</div>
                            <div className="text-primary">#ID{report.id}</div>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="text-center py-5">
                <p className="text-muted mb-0">No se encontraron reportes</p>
              </div>
            )}

            {filteredReports.length > itemsPerPage && (
              <Pagination className="mt-4 justify-content-center">
                <Pagination.Prev 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="shadow-sm"
                />
                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item 
                    key={i+1}
                    active={i+1 === currentPage}
                    onClick={() => setCurrentPage(i+1)}
                    className="shadow-sm"
                  >
                    {i+1}
                  </Pagination.Item>
                ))}
                <Pagination.Next 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="shadow-sm"
                />
              </Pagination>
            )}
          </section>
        </Container>
      </div>
    </div>
  );
};

export default DashboardLideres;