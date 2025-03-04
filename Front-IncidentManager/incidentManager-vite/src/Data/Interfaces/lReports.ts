export interface IReportes {
    idReporte?: number;
    titulo: string;
    fkDestinatario?: number;
    fkPrioridad: number;
    descripcion: string;
    fkEstado?: number;
    fechaCreada?: string ;
}