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
/* Funcion que muestra los reportes creados por el usuario */
export const GetReportsByUsers = async (id: number): Promise<IReportes[]> => {
  try {
    const response = await axiosInstance.get(`/api/Reportes/GetReportesByUsers/${id}`);
    return response.data as IReportes[];
  } catch (error) {
    console.error('Error al obtener los reportes del usuario:', error);
    throw error;
  }
};

export const GetReportid = async (id: number): Promise<IReportes> => {
  try {
    const response = await axiosInstance.get(`/api/Reportes/${id}`);
    return response.data;  
  } catch (error) {
    console.error('Error al obtener el Reportes:', error);
    throw error;
  }
};
export const createReports = async (reportsData: IReportes): Promise<IReportes> => {
  try {
    const response = await axiosInstance.post('/api/Reportes/create', reportsData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el reporte:', error);
    throw error;
  }
};

export const updateReports = async (id: number, reportsData: IReportes): Promise<IReportes> => {
  try {
    const response = await axiosInstance.put(`/api/Reportes/update/${id}`, reportsData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el reporte:', error);
    throw error;
  }
};

export const deleteReports = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/Reportes/delete/${id}`);
  } catch (error) {
    console.error('Error al eliminar el reporte:', error);
    throw error;
  }
};
