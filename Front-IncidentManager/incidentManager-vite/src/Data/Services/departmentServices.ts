import axiosInstance from "./AxiosConfig";
import { IDepartamento } from "../Interfaces/lDepartamento";

export const GetDepartment = async (): Promise<IDepartamento[]> => {
  try {
    const response = await axiosInstance.get('/api/Departamentos');
    return response.data as IDepartamento[];
  } catch (error) {
    console.error('Error al obtener los Departamentos:', error);
    throw error;
  }
};

export const createDepartment = async (DepartmentData: IDepartamento): Promise<IDepartamento> => {
  try {
    const response = await axiosInstance.post('/api/Departamentos/create', DepartmentData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el reporte:', error);
    throw error;
  }
};

export const updateDepartment = async (id: number, DepartmentData: IDepartamento): Promise<IDepartamento> => {
  try {
    const response = await axiosInstance.put(`/api/Departamentos/update/${id}`, DepartmentData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el reporte:', error);
    throw error;
  }
};

export const deleteDepartment = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/Departamentos/delete/${id}`);
  } catch (error) {
    console.error('Error al eliminar el reporte:', error);
    throw error;
  }
};
