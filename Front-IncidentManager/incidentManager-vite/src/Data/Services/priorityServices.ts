import axiosInstance from "./AxiosConfig";
import { Iprioridad } from "../Interfaces/lPrioridad";

export const GetPriority = async (): Promise<Iprioridad[]> => {
  try {
    const response = await axiosInstance.get('/api/Prioridad');
    return response.data as Iprioridad[]; 
  } catch (error) {
    console.error('Error al obtener las prioridad:', error);
    throw error; 
  }
};

export const GetPriorityid = async (id: number): Promise<Iprioridad> => {
  try {
    const response = await axiosInstance.get(`/api/Prioridad/${id}`);
    return response.data;  
  } catch (error) {
    console.error('Error al obtener la prioridad:', error);
    throw error;
  }
};

