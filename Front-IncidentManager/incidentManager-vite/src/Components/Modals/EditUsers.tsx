
import React from 'react';
import { Modal, Button } from 'react-bootstrap';


interface MDeleteUserProps {
  show: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}


const MDeleteUser: React.FC<MDeleteUserProps> = ({ show, handleClose }) => {


  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="delete-user-modal-title"></Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center justify-content-center">
        
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        
      </Modal.Footer>
    </Modal>
  );
};

export default MDeleteUser;