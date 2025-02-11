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
  const response = await axiosInstance.get(`/api/Usuarios${id}`);
  return response.data.result as IUsuario;
};   

export const createUser = async (userData: IUsuario): Promise<IUsuario> => {
  const response = await axiosInstance.post('/Usuario/create', userData);
  return response.data.result as IUsuario;
};

export const updateUser = async (idUsuarios: number, userData: IUsuario): Promise<IUsuario> => {
  const response = await axiosInstance.put(`/Usuario/update/${idUsuarios}`, userData);
  return response.data.result as IUsuario;
};

export const deleteUser = async (idUsuarios: number): Promise<void> => {
  await axiosInstance.delete(`/Usuario/delete/${idUsuarios}`);
};
