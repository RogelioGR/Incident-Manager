export interface IViewUsuario {
    idUsuario?: number;
    nombre: string;
    apellidos: string;
    correoElectronico: string;
    correoPersonal?: string;
    contraseña?: string;
    fkDepartamento?: string ;
    fkRol: string ;
    num_Empleado: number;

}