import axiosInstance from "./AxiosConfig";
import { IUsuario } from "../Interfaces/IUsers";
import { IViewUsuario } from "../Interfaces/viewUsers";

/* funcion que muestra todo los usuarios */
export const obtenerUsuarios = async (): Promise<IUsuario[]> => {
  try {
    const response = await axiosInstance.get('/api/Usuarios');
    return response.data as IUsuario[]; 
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error; 
  }
};
/* Vista de View de la base de datos  */
export const viewUsuarios = async (): Promise<IViewUsuario[]> => {
  try {
    const response = await axiosInstance.get('/Views/viewUsers');
    return response.data as IViewUsuario[]; 
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error; 
  }
};
/* funcion que obtiene la informacion del usuario por su id */
export const obtenerUsuarioid = async (id: number): Promise<IUsuario> => {
  try {
    const response = await axiosInstance.get(`/api/Usuarios/${id}`);
    return response.data;  
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw error;
  }
};
/* fucncion de crear el usuario */
export const createUser = async (userData: IUsuario): Promise<IUsuario> => {
  try {
    const response = await axiosInstance.post('/api/Usuarios/create', userData);
    return response.data; 
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
};
/* funcion de actualizar informacion del usuario */
export const updateUser = async (idUsuarios: number, userData: IUsuario): Promise<IUsuario> => {
  try {
    const response = await axiosInstance.put(`/api/Usuarios/update/${idUsuarios}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};
/* funcion de eliminar el usuario */
export const deleteUser = async (idUsuarios: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/Usuarios/delete/${idUsuarios}`);
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
};
