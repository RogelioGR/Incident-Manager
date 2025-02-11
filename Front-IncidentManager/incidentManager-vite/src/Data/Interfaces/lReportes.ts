export interface IReportes {
    ID_Reportes: number;
    Titulo_Reporte: string;
    FK_Destinatario: number;
    FK_Prioridad: number;
    Descripcion: string;
    FK_Estado: number;
    Fecha_Creada: number;
}