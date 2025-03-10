export interface IUsuario {
    idUsuarios?: number;
    nombre: string;
    apellidos: string;
    correoElectronico: string;
    correoPersonal?: string;
    contraseña?: string;
    fkDepartamento?: number;
    numEmpleado: number;
    fkRol:  number;
}