import axiosInstance from "./AxiosConfig";
import { IReportes } from "../Interfaces/lReports";

export const GetReport = async (): Promise<IReportes[]> => {
    try {
      const response = await axiosInstance.get('/api/Reportes');
      return response.data as IReportes[]; 
    } catch (error) {
      console.error('Error al obtener los Reportes:', error);
      throw error; 
    }
  };