import React from "react";
import { Modal, Button } from "react-bootstrap";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

/* Funcion del services departamento */
import { deleteDepartment } from "../../../Data/Services/departmentServices";

interface MDeleteProps {
  show: boolean;
  handleClose: () => void;
  departId?: number;
}
/* sweetalert2 */
const MySwal = withReactContent(Swal);

const MDeleteDepart: React.FC<MDeleteProps> = ({
  show,
  handleClose,
  departId,
}) => {
  const DropDepartments = async () => {
    try {
      if (departId !== undefined) {
        await deleteDepartment(departId);
        MySwal.fire({
          title: "Eliminado",
          text: "El departamento ha sido eliminado.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        throw new Error("El ID del departamento es indefinido");
      }
    } catch (error) {
      console.error(error);
      MySwal.fire({
        title: "Error",
        text: "No se pudo eliminar el departamento.",
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
        <h2>Eliminar Usuario</h2>
        <p>¿Estás seguro de que deseas eliminar el departamento {departId}?</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="danger" onClick={DropDepartments}>
          Eliminar
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MDeleteDepart;