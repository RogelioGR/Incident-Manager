import { IUsuario } from "../Interfaces/IUsers";
import { ApiResponse } from "../Interfaces/IApiResponse";
import axiosInstance from "./AxiosConfig";

// Obtener todos los usuarios
export const obtenerUsuarios = async (): Promise<IUsuario[]> => {
    try {
        const response = await axiosInstance.get<ApiResponse<IUsuario[]>>("api/Usuarios");
        return response.data.result || [];
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        return [];
    }
};
// Crear un nuevo usuario
export const crearUsuario = async (usuario: IUsuario): Promise<IUsuario> => {
  try {
    const response = await axiosInstance.post<ApiResponse<IUsuario>>("api/Usuarios", usuario);
    return response.data.result;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
};

// Editar un usuario existente
export const editarUsuario = async (id: number, usuario: Partial<IUsuario>): Promise<IUsuario> => {
  try {
    const response = await axiosInstance.put<ApiResponse<IUsuario>>(`api/Usuarios/${id}`, usuario);
    return response.data.result;
  } catch (error) {
    console.error("Error al editar el usuario:", error);
    throw error;
  }
};

// Eliminar un usuario
export const eliminarUsuario = async (id: number): Promise<boolean> => {
  try {
    const response = await axiosInstance.delete<ApiResponse<boolean>>(`api/Usuarios/${id}`);
    return response.data.succeded;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;
  }
};