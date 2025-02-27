import React from 'react';
import {Container } from 'react-bootstrap';

/*Componentes */
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

const PageHistorial: React.FC = () => {
  return (
    <>
      <div className="d-flex vh-100 flex-column flex-md-row viewinform-container">
        <Sidebar />
        <div className="flex-grow-1 d-flex flex-column viewinform-content">
          <Header />
          <Container className="p-4" style={{ overflowY: 'auto' }}>
                    <div className="container mt-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h2 className="reports-title">Historial</h2>
                        </div>
                    </div>
                </Container>
        </div>
      </div>
    </>
  );
};

export default PageHistorial;
