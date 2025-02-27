import axiosInstance from "./AxiosConfig";
import { IRoles } from "../Interfaces/lRoles";

export const GetRols = async (): Promise<IRoles[]> => {
  try {
    const response = await axiosInstance.get('/api/roles');
    return response.data as IRoles[]; 
  } catch (error) {
    console.error('Error al obtener los roles de usuario:', error);
    throw error; 
  }
};

export const GetRolsId = async (id: number): Promise<IRoles> => {
    try {
      const response = await axiosInstance.get(`/api/roles/${id}`);
      return response.data;  
    } catch (error) {
      console.error('Error al obtener el rol:', error);
      throw error;
    }
  };