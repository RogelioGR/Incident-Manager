import axiosInstance from "./AxiosConfig";
import { IReportes } from "../Interfaces/lReports";
import { IEmail } from "../Interfaces/IEmail";

export const sendEmail = async (reportsData: IEmail): Promise<IEmail> => {
    try {
      const response = await axiosInstance.post('/Email/enviar-correo', reportsData);
      return response.data;
    } catch (error) {
      console.error('Error al intentar el correo al usuario:', error);
      throw error;
    }
  };
  

export const createReportsEmail = async (reportsData: IReportes): Promise<IReportes> => {
    try {
      const response = await axiosInstance.post('/Email/crear', reportsData);
      return response.data;
    } catch (error) {
      console.error('Error al crear el reporte y al enviar el correo de notificacion:', error);
      throw error;
    }
  };
  