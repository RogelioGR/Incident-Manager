import axiosInstance from "./AxiosConfig";
import { IEstadoReporte } from "../Interfaces/IEstadoReporte";

export const GetStatusReports = async (): Promise<IEstadoReporte[]> => {
  try {
    const response = await axiosInstance.get('/api/roles');
    return response.data as IEstadoReporte[]; 
  } catch (error) {
    console.error('Error al obtener los roles de usuario:', error);
    throw error; 
  }
};

export const GetStatusReportsId = async (id: number): Promise<IEstadoReporte> => {
    try {
      const response = await axiosInstance.get(`/api/roles/${id}`);
      return response.data;  
    } catch (error) {
      console.error('Error al obtener el rol:', error);
      throw error;
    }
  };