import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';


/* Importacion de services para funcionamiento de reportes */
import { IReportes } from '../Data/Interfaces/lReports';
import { Iprioridad } from '../Data/Interfaces/lPrioridad';
import { GetReportsByUsers } from '../Data/Services/ReportServices';
import { GetPriorityid } from '../Data/Services/priorityServices';

/* Importacion de paginas */
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import CrearReporteModal from '../Components/Modals/Reports/McreateReports';
import MDeleteReports from '../Components/Modals/Reports/MdropdReports';
import { Link } from 'react-router-dom';

const PageReporte: React.FC = () => {
  const [reportes, setReportes] = useState<IReportes[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [prioridades, setPrioridades] = useState<Map<number, Iprioridad>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [modalType, setModalType] = useState<'CREATE' | 'EDIT' | 'DELETE' | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      const userId = parseInt(localStorage.getItem('idUsuarios') || '0', 10);
      if (userId) {
        try {
          const reportesData = await GetReportsByUsers(userId);
          setReportes(reportesData);
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

  const filteredReportes = reportes.filter(reporte =>
    reporte.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reporte.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPriorityClass = (prioridadId: number): string => {
    const prioridad = prioridades.get(prioridadId)?.nombrePrioridad?.toLowerCase() || '';
    if (prioridad.includes('alta')) return 'priority-high';
    if (prioridad.includes('media')) return 'priority-medium';
    if (prioridad.includes('baja')) return 'priority-low';
    return '';
  };
  

  return (
    <div className="d-flex vh-100 flex-column flex-md-row viewinform-container">
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column viewinform-content">
        <Header />
        <Container className="my-2" style={{ overflowY: 'auto' }}>
          <div className="container mt-2">
            <h2 className="reports-title">Reportes</h2>
            <div className="reports-header">
              <button
                className="btn btn-success mt-4"
                onClick={() => setModalType('CREATE')}
              >
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
                        <Link to={`/vista`} style={{ textDecoration: 'none', color: '#000000' }} >
                        
                      <div className="report-card">
                        <div className="card-header"></div>
                        <div className="card-content">
                          <h5 className="card-title">{reporte.titulo}</h5>
                          {typeof reporte.fkPrioridad === 'number' && (
                            <span className={`priority-badge ${getPriorityClass(reporte.fkPrioridad)}`}>
                              {prioridades.get(reporte.fkPrioridad)?.nombrePrioridad || 'Normal'}
                            </span>
                          )}
                          <p
                            className="card-description line-clamp-3 hover:line-clamp-none cursor-pointer"
                            title={reporte.descripcion}
                          >
                            {reporte.descripcion}
                          </p>
                          <div className="card-buttons">
                            <button className="btn-card btn btn-primary">Ver</button>
                            <button className="btn-card btn btn-danger">Eliminar</button>
                          </div>
                        </div>
                      </div>
                        </Link>

                    </div>
                    
                  ))
                ) : searchQuery ? (
                  <div className="col-12 no-results">
                    <div className="no-results-icon">
                      <i className="bi bi-search"></i>
                    </div>
                    <p className="no-results-text">No se encontraron reportes</p>
                  </div>
                ) : (
                  <div className="col-12 reports-empty">
                    <div className="reports-empty-icon">
                      <i className="bi bi-clipboard-x"></i>
                    </div>
                    <p className="reports-empty-text">Todavía no has generado ningún reporte</p>
                    <button
                      className="btn btn-success mt-4"
                      onClick={() => setModalType('CREATE')}
                    >
                      Crear mi primer reporte
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
      </div>
      {modalType === 'CREATE' && <CrearReporteModal show={true} handleClose={() => setModalType(null)} />}
      
    </div>
  );
};

export default PageReporte;