import axiosInstance from "./AxiosConfig";
import { IUsuario } from "../Interfaces/IUsers";

export const obtenerUsuarios = async (): Promise<IUsuario[]> => {
  try {
    const response = await axiosInstance.get('/api/Usuarios');
    return response.data as IUsuario[]; // No se necesita acceder a 'result' si ya devuelve directamente los usuarios
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error; // Puedes manejar el error como desees
  }
};

export const obtenerUsuarioid = async (id: number): Promise<IUsuario> => {
  const response = await axiosInstance.get(`/api/Usuarios${id}`);
  return response.data.result as IUsuario;
};   


