import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner, Card, Alert, Form } from "react-bootstrap";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    const fetchUser = async () => {
      try {
        setLoading(true);
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
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p>Cargando información...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : user ? (
            <Card className="p-3">
              <Card.Body>
                <Form>
                <h2 className="text-center mb-4">nformación del Usuario</h2>
                  <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" value={user.nombre || ""} readOnly />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control type="text" value={user.apellidos || ""} readOnly />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control type="email" value={user.correoElectronico || ""} readOnly />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Correo Personal</Form.Label>
                    <Form.Control type="email" value={user.correoPersonal || ""} readOnly />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Departamento</Form.Label>
                    <Form.Control type="text" value={user.fkDepartamento?.toString() || ""} readOnly />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Rol de Usuario</Form.Label>
                    <Form.Control type="text" value={user.fkRol?.toString() || ""} readOnly />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          ) : (
            <p className="text-center">No se encontró información del usuario.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {user && (
            <Button variant="warning" onClick={() => handleOpenModal(ModalsUsers.EDIT_USER, user.idUsuarios)}>Editar Usuario</Button>
          )}
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      <MEditUser show={modalUsers === ModalsUsers.EDIT_USER} handleClose={handleCloseModal} userId={selectedUserId} />

    </>
  );
};

export default MViewUser;
