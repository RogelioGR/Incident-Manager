import axiosInstance from "./AxiosConfig";
import { ITipoReporte } from "../Interfaces/ITipoReporte";

export const GetTipReports = async (): Promise<ITipoReporte[]> => {
  try {
    const response = await axiosInstance.get('/api/TipoReporte');
    return response.data as ITipoReporte[]; 
  } catch (error) {
    console.error('Error al obtener los Tipos de reporte de usuario:', error);
    throw error; 
  }
};

export const GetTipReportsId = async (id: number): Promise<ITipoReporte> => {
    try {
      const response = await axiosInstance.get(`/api/TipoReporte/${id}`);
      return response.data;  
    } catch (error) {
      console.error('Error al obtener el tipo de reporte:', error);
      throw error;
    }
  };