import axiosInstance from "./AxiosConfig";
import { IComentario } from "../Interfaces/lComentarios";

export const GetComments = async (): Promise<IComentario[]> => {
  try {
    const response = await axiosInstance.get('/api/Comentario');
    return response.data as IComentario[]; 
  } catch (error) {
    console.error('Error al obtener los comentarios:', error);
    throw error; 
  }
};

export const GetCommentsId = async (id: number): Promise<IComentario> => {
  try {
    const response = await axiosInstance.get(`/api/Comentario/${id}`);
    return response.data;  
  } catch (error) {
    console.error('Error al obtener el comentario:', error);
    throw error;
  }
};
export const createComment = async (userData: IComentario): Promise<IComentario> => {
  try {
    const response = await axiosInstance.post('/api/Comentario/create', userData);
    return response.data; 
  } catch (error) {
    console.error('Error al crear el comentario:', error);
    throw error;
  }
};
export const updateUser = async (id: number, userData: IComentario): Promise<IComentario> => {
  try {
    const response = await axiosInstance.put(`/api/Comentario/update/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el comentario:', error);
    throw error;
  }
};
export const deleteUser = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/Comentario/delete/${id}`);
  } catch (error) {
    console.error('Error al eliminar el comentario:', error);
    throw error;
  }
};
