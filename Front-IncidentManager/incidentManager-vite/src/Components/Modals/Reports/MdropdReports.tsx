import React from "react";
import { Modal, Button } from "react-bootstrap";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import { deleteReports } from "../../../Data/Services/ReportServices";

interface MDeleteProps {
  show: boolean;
  handleClose: () => void;
  ReportsId?: number;
}

/* sweetalert2 */
const MySwal = withReactContent(Swal);

const MDeleteReports: React.FC<MDeleteProps> = ({
  show,
  handleClose,
  ReportsId,
}) => {
  const ValidarEliminacion = async () => {
    try {
      if (ReportsId !== undefined) {
        await deleteReports(ReportsId);
        MySwal.fire({
          title: "Eliminado",
          text: "El reporte ha sido eliminado.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        throw new Error("El ID del reporte es indefinido");
      }
    } catch (error) {
      console.error(error);
      MySwal.fire({
        title: "Error",
        text: "No se pudo eliminar el reporte.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className="text-center justify-content-center">
        <h2>Eliminar Reporte</h2>
        <p>¿Estás seguro de que deseas eliminar el reporte?</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="danger" onClick={ValidarEliminacion}>
          Eliminar
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MDeleteReports;