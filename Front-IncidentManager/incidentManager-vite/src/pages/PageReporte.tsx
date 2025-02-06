import React from 'react';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { Container } from 'react-bootstrap';

const PageReporte: React.FC = () => {
  return (
    <>
      <div className="d-flex vh-100 flex-column flex-md-row viewinform-container">
        <Sidebar />
        <div className="flex-grow-1 d-flex flex-column viewinform-content">
          <Header />
          <Container className="my-3" style={{ overflowY: 'auto' }}>
            <div className="container mt-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="reports-title">Reportes</h1>
                <div className="d-flex align-items-center search-container">
                  <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search"
                  />
                </div>
              </div>
              <button className="btn btn-primary mb-4">Crear Reporte</button>
              <div className="row g-3">
                {[...Array(4)].map((_, index) => (
                  <div className="col-md-3" key={index}>
                    <div className="card report-card">
                      <div className="card-body">
                        <h5 className="card-title">Título problema</h5>
                        <p className="card-subtitle mb-2 text-muted">Prioridad</p>
                        <p className="card-text">Descripción del problema que se está reportando.</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <i className="bi bi-calendar"></i>
                          <i className="bi bi-three-dots"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default PageReporte;