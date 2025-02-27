import axiosInstance from './AxiosConfig';
interface LoginData {
    correo: string;
    contraseña: string; 
}
interface AuthResponse {
    token: string;
    idUsuarios: string; 
    fkRol: string; 
}

export const login = async (loginData: LoginData): Promise<void> => {
    try {
        const response = await axiosInstance.post<AuthResponse>('/Auth/login', loginData);

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('idUsuarios', response.data.idUsuarios);
        localStorage.setItem('fkRol', response.data.fkRol);

    } catch (error) {
        console.error('Ocurrio un error en el inicio de sesión:', error);
        throw new Error('Error de inicio de sesion');
    }
};

export const logout = () => {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('fkRol');
    localStorage.removeItem('idUsuarios');
};