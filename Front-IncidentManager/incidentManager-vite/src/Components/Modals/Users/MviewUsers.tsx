import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner, Card, Alert, Form } from "react-bootstrap";

import { IUsuario } from "../../../Data/Interfaces/IUsers";
import { obtenerUsuarioid } from "../../../Data/Services/UsersServices";
import { IDepartamento } from "../../../Data/Interfaces/lDepartamento";
import { GetDepartment } from "../../../Data/Services/departmentServices";
import { IRoles } from "../../../Data/Interfaces/lRoles";
import { GetRols } from "../../../Data/Services/RolServices";
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
  const [departments, setDepartments] = useState<IDepartamento[]>([]);
  const [roles, setRoles] = useState<IRoles[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const departmentsData = await GetDepartment();
        const rolesData = await GetRols();
        setDepartments(departmentsData);
        setRoles(rolesData);

        if (userId) {
          const userData = await obtenerUsuarioid(userId);
          setUser(userData);
        }
      } catch (error) {
        setError("Error al cargar la información");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const getDepartmentName = (departmentId: number | undefined) => {
    const department = departments.find((dept) => dept.idDepartamento === departmentId);
    return department ? department.nombreDepartamentos : "Desconocido";
  };

  const getRoleName = (roleId: number | undefined) => {
    if (roleId === undefined) return "Desconocido";
    const role = roles.find((rol) => rol.idRol === roleId);
    return role ? role.nombreRol : "Desconocido";
  };

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
                  <h2 className="text-center mb-4">Información del Usuario</h2>
                  <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" value={user.nombre} readOnly />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control type="text" value={user.apellidos} readOnly />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control type="email" value={user.correoElectronico} readOnly />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Correo Personal</Form.Label>
                    <Form.Control type="email" value={user.correoPersonal || "Sin correo personal"} readOnly />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Departamento</Form.Label>
                    <Form.Control type="text" value={getDepartmentName(user.fkDepartamento)} readOnly />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Rol de Usuario</Form.Label>
                    <Form.Control type="text" value={getRoleName(user.fkRol)} readOnly />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Numero de Usuario</Form.Label>
                    <Form.Control type="text" value={user.numEmpleado?.toString()} readOnly />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          ) : (
            <p className="text-center">No se encontró información del usuario.</p>
          )}
          <div className="text-center mt-4">
            {user && (
              <Button variant="warning" className="me-2" onClick={() => handleOpenModal(ModalsUsers.EDIT_USER, user.idUsuarios)}>Editar Usuario</Button>
            )}
            <Button
              variant="secondary"
              className="me-2"
              onClick={handleClose}
            >
              Cancelar
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <MEditUser show={modalUsers === ModalsUsers.EDIT_USER} handleClose={handleCloseModal} userId={selectedUserId} />
    </>
  );
};

export default MViewUser;