import React from 'react';
import {  useNavigate } from 'react-router-dom';


/*Componentes */
import Header from '../Components/Header';
import { Container } from 'react-bootstrap';

const PageViewReports: React.FC = () => {
      const navigate = useNavigate();
    
  return (
    <>
      <div className="d-flex vh-100 flex-column flex-md-row viewinform-container">
        <div className="flex-grow-1 d-flex flex-column viewinform-content">
          <Header />
          <Container className="my-3" style={{ overflowY: 'auto' }}>
            <div className="mt-2">
            <h1 className="mb-2">reporte vista</h1>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default PageViewReports;
