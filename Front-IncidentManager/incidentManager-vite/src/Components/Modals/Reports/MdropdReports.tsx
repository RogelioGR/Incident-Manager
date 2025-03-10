import React, { useState } from "react";
import { Modal, Button, Container, Card } from "react-bootstrap";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { deleteReports } from "../../../Data/Services/ReportServices";

interface MDeleteProps {
  show: boolean;
  handleClose: () => void;
  ReportsId?: number;
}

/** sweetalert2 **/
const MySwal = withReactContent(Swal);

const MDeleteReports: React.FC<MDeleteProps> = ({
  show,
  handleClose,
  ReportsId,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const ValidarEliminacion = async () => {
    try {
      if (ReportsId !== undefined) {
        setIsLoading(true);
        await deleteReports(ReportsId);
        MySwal.fire({
          title: "¡Éxito!",
          text: "El reporte ha sido eliminado exitosamente",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#28a745"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        handleClose();
      } else {
        throw new Error("El ID del reporte es indefinido");
      }
    } catch (error) {
      console.error("Error al eliminar el reporte:", error);
      MySwal.fire({
        title: "Error al eliminar",
        text: "No se pudo eliminar el reporte. Inténtelo de nuevo más tarde.",
        icon: "error",
        confirmButtonText: "Aceptar"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>
        
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
        <Container className="py-3">
          <Card className="shadow-sm">
            <Card.Body>
              {isLoading ? (
                <div className="text-center py-4">
                  <i className="fa-solid fa-circle-notch fa-spin fa-2x text-danger"></i>
                  <p className="mt-2">Procesando solicitud...</p>
                </div>
              ) : (
                <div className="text-center py-3">
                  <i className="fa-solid fa-exclamation-triangle fa-4x mb-3" style={{ color: "#dc3545" }}></i>
                  <h4 className="mb-3">¿Estás seguro de que deseas eliminar este reporte?</h4>
                  <p className="text-muted mb-4">Esta acción no se puede deshacer y eliminará permanentemente el reporte seleccionado.</p>
                  
                  <div className="d-flex justify-content-center gap-3 mt-4">
                    <Button 
                      variant="danger" 
                      onClick={ValidarEliminacion}
                      className="px-4 py-2"
                      disabled={isLoading}
                    >
                      <i className="fa-solid fa-trash-alt me-2"></i>
                      Eliminar Reporte
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={handleClose}
                      className="px-4 py-2"
                      disabled={isLoading}
                    >
                      <i className="fa-solid fa-xmark me-2"></i>
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default MDeleteReports;