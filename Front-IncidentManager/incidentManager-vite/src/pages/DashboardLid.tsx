import React from 'react';

/*Componentes */
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { Container } from 'react-bootstrap';

const DashboardLideres: React.FC = () => {
  return (
    <>
      <div className="d-flex vh-100 flex-column flex-md-row viewinform-container">
        <Sidebar />
        <div className="flex-grow-1 d-flex flex-column viewinform-content">
          <Header />
          <Container className="my-3" style={{ overflowY: 'auto' }}>
            <div className="mt-2">
            <h1 className="mb-2">Dashboard Empleado</h1>
            </div>

          </Container>
        </div>
      </div>
    </>
  );
};

export default DashboardLideres;
