import axiosInstance from "./AxiosConfig";
import { IUsuario } from "../Interfaces/IUsers";

export const obtenerUsuarios = async (): Promise<IUsuario[]> => {
  try {
    const response = await axiosInstance.get('/api/Usuarios');
    return response.data as IUsuario[]; 
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error; 
  }
};

export const obtenerUsuarioid = async (id: number): Promise<IUsuario> => {
  try {
    const response = await axiosInstance.get(`/api/Usuarios/${id}`);
    return response.data;  
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw error;
  }
};

export const createUser = async (userData: IUsuario): Promise<IUsuario> => {
  try {
    const response = await axiosInstance.post('/api/Usuarios/create', userData);
    return response.data; 
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
};

export const updateUser = async (idUsuarios: number, userData: IUsuario): Promise<IUsuario> => {
  try {
    const response = await axiosInstance.put(`/api/Usuarios/update/${idUsuarios}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

export const deleteUser = async (idUsuarios: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/Usuarios/delete/${idUsuarios}`);
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
};
