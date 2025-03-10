import React from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";

interface HelpModalProps {
  show: boolean;
  handleClose: () => void;
}

const MinformModal: React.FC<HelpModalProps> = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Container className="flex-grow-1 my-3">
          <h2 className="text-center mb-4">¿Qué es Hardware y Software?</h2>
          <div className="d-flex justify-content-between">
            <Row>
              <Col>
                <h5>
                  <i className="fa-solid fa-computer me-2" style={{ color: "#666666" }}></i>
                  Hardware
                </h5>
                <p>
                  El <strong>hardware</strong> se refiere a los componentes físicos de un sistema informático. Son elementos tangibles que puedes tocar, como:
                </p>
                <ul>
                  <li><i className="fa-solid fa-computer me-2" style={{ color: "#666666" }}></i>Computadoras</li>
                  <li><i className="fa-solid fa-print me-2" style={{ color: "#E64A19" }}></i>Impresoras</li>
                  <li><i className="fa-solid fa-keyboard me-2" style={{ color: "#404040" }}></i>Teclados</li>
                  <li><i className="fa-solid fa-desktop me-2" style={{ color: "#1976D2" }}></i>Monitores</li>
                  <li><i className="fa-solid fa-hard-drive me-2" style={{ color: "#7B1FA2" }}></i>Discos duros</li>
                </ul>
              </Col>
              <Col>
                <h5>
                  <i className="fa-brands fa-windows me-2" style={{ color: "#0078D7" }}></i>
                  Software
                </h5>
                <p>
                  El <strong>software</strong> se refiere a los programas y aplicaciones que se ejecutan en el hardware. Son elementos intangibles, como:
                </p>
                <ul>
                  <li><i className="fa-brands fa-windows me-2" style={{ color: "#0078D7" }}></i>Sistemas operativos (Windows)</li>
                  <li>
                    <i className="fa-solid fa-file-word me-2" style={{ color: "#2B579A" }}></i>
                    <i className="fa-solid fa-file-excel mx-1" style={{ color: "#217346" }}></i>
                    Aplicaciones (Word, Excel, 
                    <i className="fa-solid fa-globe mx-1" style={{ color: "#FF9800" }}></i>
                    Navegadores web)
                  </li>
                  <li><i className="fa-solid fa-gears me-2" style={{ color: "#616161" }}></i>Controladores del sistema operativo</li>
                </ul>
              </Col>
            </Row>
          </div>
          <div>
            <Col>
              <div className="p-3 bg-light rounded mt-3">
                <p className="mb-0">
                  <strong>Nota:</strong> Si tu problema está relacionado con un dispositivo físico (como una impresora que no funciona), selecciona <strong><i className="fa-solid fa-computer mx-1" style={{ color: "#666666" }}></i>Hardware</strong>. Si el problema está relacionado con un programa o aplicación (como un error en un software), selecciona <strong><i className="fa-brands fa-windows mx-1" style={{ color: "#0078D7" }}></i>Software</strong>.
                </p>
              </div>
            </Col>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default MinformModal;