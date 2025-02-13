import React, { useEffect, useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import { IUsuario } from "../../../Data/Interfaces/IUsers";
import { obtenerUsuarioid } from "../../../Data/Services/UsersServices";


interface MCreateUserProps {
  show: boolean;
  handleClose: () => void;
  userId?: number;
}

const MCreateUser: React.FC<MCreateUserProps> = ({ show, handleClose }) => {
      const [user, setUser] = useState<IUsuario | null>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

 useEffect(() => {
    let isMounted = true;
    
    const fetchUser = async () => {
      try {
        setLoading(true);
        const id = user?.idUsuarios;
  
        if (userId !== isMounted) {
          const idUsuarios = parseInt(id, 10);          
          const userData = await obtenerUsuarioid(userId);
  
          setUser(userData);
        }
      } catch (error) {
        console.error('Error completo:', error);
        if (isMounted) {
          setError('Error al cargar la información del usuario');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
  
    fetchUser();


    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="flex-grow-1 my-5">
          <h2 className="text-center mb-4">Crear usuario</h2>

      
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default MCreateUser;