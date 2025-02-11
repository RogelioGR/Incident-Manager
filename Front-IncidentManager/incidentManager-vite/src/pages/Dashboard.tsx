import React from 'react';

/*Componentes */
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { Container, Dropdown } from 'react-bootstrap';

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="d-flex vh-100 flex-column flex-md-row viewinform-container">
        <Sidebar />
        <div className="flex-grow-1 d-flex flex-column viewinform-content">
          <Header />
          <Container className="my-3" style={{ overflowY: 'auto' }}>
            <div className="mt-2">
            <h1 className="mb-2">Dashboard</h1>

              <div className="d-flex align-items-center justify-content-end mt-4 mb-4">
                <div className="d-flex align-items-center ">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="secondary"
                      id="dropdown-options"
                      className="me-12"
                    >
                      Nivles de prioridad
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/inicio">Todas</Dropdown.Item>
                      <Dropdown.Item href="#/alta-prioridad">
                        Alta Prioridad <span className="badge bg-secondary">7</span>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/media-prioridad">
                        Media Prioridad <span className="badge bg-secondary">2</span>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/basica-prioridad">
                        Básica Prioridad <span className="badge bg-secondary">99+</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
           
                  <input
                    type="text"
                    className="form-control search-input m-2"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
            {/* Cards */}
            <div className="row g-3">
              {[...Array(14)].map((_, index) => (
                <div className="col-md-3" key={index}>
                  <div className="card report-card">
                    <div className="card-body">
                      <h5 className="card-title">Título problema</h5>
                      <p className="card-subtitle mb-2 text-muted">Prioridad</p>
                      <p className="card-text">
                        Descripción del problema que se está reportando.
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <i className="bi bi-calendar"></i>
                        <i className="bi bi-three-dots"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
