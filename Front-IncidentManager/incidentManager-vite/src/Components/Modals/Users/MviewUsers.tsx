import React, { useEffect, useState } from "react";
import { Modal,  Button, Spinner, Placeholder, Row } from "react-bootstrap";
import { IUsuario } from "../../../Data/Interfaces/IUsers";
import { obtenerUsuarioid } from "../../../Data/Services/UsersServices";

import MEditUser from "./MupdateUsers";

interface MviewUserProps {
  show: boolean;
  handleClose: () => void;
  userId?: number;
}

const MViewUser: React.FC<MviewUserProps> = ({ show, handleClose, userId }) => {
  const [user, setUser] = useState<IUsuario | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      if (!userId) return;
      const fetchUser = async () => {
        try {
          const userData = await obtenerUsuarioid(userId);
          setUser(userData);
        } catch (error) {
          setError("Error al cargar la información del usuario");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }, [userId]);
    
    enum ModalsUsers {
      NONE = 'NONE',
      EDIT_USER = 'EDIT_USER',

    }
         const [modalUsers, setModalUsers] = useState(ModalsUsers.NONE);
          const [selectedUserId, setSelectedUserId] = useState<number>();
        
          const handleCloseModal = () => setModalUsers(ModalsUsers.NONE);
        
          const handleOpenModal = (type: ModalsUsers, IdUsuario?: number) => {
            setModalUsers(type);
            setSelectedUserId(IdUsuario);
          };
       
    

  return (
    <>
      <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className="text-center justify-content-center">
      <h2 className="text-center mb-4">usuario</h2>
      {loading && (
        <>
              <Spinner
            animation="grow"
            variant="secondary"
            role="status"
            style={{ width: '40px', height: '40px' }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <div className="ms-2">
            <Placeholder
              as="div"
              animation="glow"
              className="bg-secondary rounded"
              style={{ height: '16px', width: '100px', marginBottom: '4px' }}
            />
            <Placeholder
              as="div"
              animation="glow"
              className="bg-secondary rounded"
              style={{ height: '14px', width: '150px' }}
            />
            </div>
        </>
      )}
      {user && (
        <Row className="justify-content-center">
            <div className="user-info">

              <p>Nombre: {user.nombre}</p>
              <p>Apellidos: {user.apellidos}</p>
              <p>correoElectronico: {user.correoElectronico}</p>
              <p>contraseña: {user.contraseña}</p>
              <p>correoPersonal: {user.correoPersonal}</p>
              <p>departamento: {user.fkDepartamento}</p>
              <p>rol de usuario : {user.fkRol}</p>
            </div>

        </Row>
          )}
          {error &&(
            <div className="alert alert-danger" role="alert">
            {error}
          </div>
          ) }
            
    <div className="text-center mt-4">
                  <Button variant="success" className="me-2" type="submit" onClick={() => handleOpenModal(ModalsUsers.EDIT_USER, user?.idUsuarios)}>
                    Editar Usuario
                  </Button>
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
      </Modal.Footer>
    </Modal>

<MEditUser show={modalUsers === ModalsUsers.EDIT_USER} handleClose={handleCloseModal} userId={selectedUserId} />
    </>
    
  );

};

export default MViewUser;
