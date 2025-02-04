import axiosInstance from './AxiosConfig';

export interface IUsuario {
    ID_Usuario: number;
    Nombre: string;
    Apellidos: string;
    Correo_Electronico: string;
    Correo_personal: string;
    Contraseña: string;
    FK_Departamento: number;
    FK_Rol: number;

}

interface ApiResponse {
    succeded: boolean;
    message: string | null;
    result: IUsuario | IUsuario[];
}

export const getUsers = async (): Promise<IUsuario[]> => {
    const response = await axiosInstance.get<ApiResponse>('/api/Usuarios');
    return response.data.result as IUsuario[];
};

export const getUserById = async (id: number): Promise<IUsuario> => {
    const response = await axiosInstance.get<ApiResponse>(`/Usuario/list/${id}`);
    return response.data.result as IUsuario;
};   

export const createUser = async (userData: IUsuario): Promise<IUsuario> => {
    const response = await axiosInstance.post<ApiResponse>('/Usuario/create', userData);
    return response.data.result as IUsuario;
};

export const updateUser = async (id: number, userData: IUsuario): Promise<IUsuario> => {
    const response = await axiosInstance.put<ApiResponse>(`/Usuario/update/${id}`, userData);
    return response.data.result as IUsuario;
};

export const deleteUser = async (id: number): Promise<void> => {
    await axiosInstance.delete<ApiResponse>(`/Usuario/delete/${id}`);
};