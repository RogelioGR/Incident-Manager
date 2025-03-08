import React, { useEffect, useState } from 'react';
import { Container, Card, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/* Importación de servicios */
import { IReportes } from '../Data/Interfaces/lReports';
import { Iprioridad } from '../Data/Interfaces/lPrioridad';
import { GetReportsByUsers } from '../Data/Services/ReportServices';
import { GetPriorityid } from '../Data/Services/priorityServices';

/* Importación de componentes  y Imagenes*/
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import CrearReporteModal from '../Components/Modals/Reports/McreateReports';
import MDeleteReports from '../Components/Modals/Reports/MdropdReports';
import incidenteIcon from '../img/reporte-de-incidente.png';


const PageReporte: React.FC = () => {

  const [reportes, setReportes] = useState<IReportes[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [prioridades, setPrioridades] = useState<Map<number, Iprioridad>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [modalType, setModalType] = useState<'CREATE' | 'DELETE' | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    /* Funcion de traer los reportes del usuario autentificado */
    const fetchData = async () => {
      setIsLoading(true);
      /* toma el id del usuario autentificado */
      const userId = parseInt(localStorage.getItem('idUsuarios') || '0', 10);
      if (userId) {
        try {
          /* con el ID del Usuario , toma la funcion del reportes por usuario */
          const reportesData = await GetReportsByUsers(userId);
          setReportes(reportesData);
          /* para luego hacer un mapeo en prioridad y no solo mostrar numeros */
          const prioridadesMap = new Map<number, Iprioridad>();
          for (const reporte of reportesData) {
            if (reporte.fkPrioridad && !prioridadesMap.has(reporte.fkPrioridad)) {
              const prioridad = await GetPriorityid(reporte.fkPrioridad);
              prioridadesMap.set(reporte.fkPrioridad, prioridad);
            }
          }
          setPrioridades(prioridadesMap);
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, []);
  /* función ordenamiento */
  const filteredReportes = [...reportes]
    .filter(reporte =>
      reporte.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reporte.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => (a.fkPrioridad ?? 3) - (b.fkPrioridad ?? 3)); 


  return (
    <div className="d-flex vh-100 flex-column flex-md-row viewinform-container">
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column viewinform-content">
        <Header />
        <Container className="my-2" style={{ overflowY: 'auto' }}>
          <div className="container mt-2">
            <h2 className="reports-title">Reportes</h2>
            <div className="reports-header">
              <button className="btn btn-success mt-4" onClick={() => setModalType('CREATE')}>
                Crear Reporte
              </button>
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Buscar reportes..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <i className="bi bi-search search-icon"></i>
              </div>
            </div>
            {isLoading ? (
              <div className="text-center p-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Cargando reportes...</p>
              </div>
            ) : (
              <div className="row g-3">
                {filteredReportes.length > 0 ? (
                  filteredReportes.map(reporte => (
                    <div className="col-md-4 col-lg-3" key={reporte.idReporte}>
                      <Card
                        className="h-100 border-0 shadow-sm rounded-3 overflow-hidden"
                        style={{ cursor: 'pointer', backgroundColor: '#f0f2f5' }}
                      >
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <span className={`badge bg-${reporte.fkPrioridad === 1 ? 'danger' : reporte.fkPrioridad === 2 ? 'warning' : 'success'}`}
                              style={{ fontSize: '0.8rem' }}>
                              {prioridades.get(reporte.fkPrioridad)?.nombrePrioridad || 'Normal'}
                            </span>
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="light"
                                className="p-2 shadow-sm"
                                style={{ backgroundColor: '#f0f2f5', outline: 'none', boxShadow: 'none' }}
                              >
                                ...
                              </Dropdown.Toggle>
                              <Dropdown.Menu align="end">
                                <Dropdown.Item
                                  className="text-danger"
                                  style={{ backgroundColor: 'transparent' }} 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedReportId(reporte.idReporte ?? null);
                                    setModalType('DELETE');
                                  }}
                                >
                                  Eliminar reporte
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>

                          </div>
                          <div onClick={() => navigate(`/vistaReporte/${reporte.idReporte}`)}
                          >
                            <Card.Title className="h5 mb-3 text-truncate">{reporte.titulo}</Card.Title>
                            <Card.Text className="text-muted small mb-0">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="text-truncate">{reporte.descripcion}</div>
                                <div className="text-primary">#ID{reporte.idReporte}</div>
                              </div>
                            </Card.Text>
                          </div>

                        </Card.Body>
                      </Card>
                    </div>
                  ))
                ) : (
                  <div className="col-12 no-results" style={{ textAlign: "center" }}>
                    <img
                      src={incidenteIcon}
                      alt="Icon"
                      style={{ width: "100px", height: "auto" }}
                    />
                    <p className="no-results-text" style={{ color: "gray", fontSize: "16px" }}>
                      No se encontraron reportes
                    </p>
                  </div>

                )}
              </div>
            )}
          </div>
        </Container>
      </div>
      {modalType === 'CREATE' && <CrearReporteModal show={true} handleClose={() => setModalType(null)} />}
      {modalType === 'DELETE' && selectedReportId !== null && (
        <MDeleteReports show={true} handleClose={() => setModalType(null)} ReportsId={selectedReportId} />
      )}
    </div>
  );
};

export default PageReporte;
