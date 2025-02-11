export interface IUsuario {
    idUsuarios: number;
    nombre: string;
    apellidos?: string;
    correoElectronico: string;
    correoPersonal?: string;
    contraseña?: string;
    fkDepartamento?: number;
    fkRol: string | number;

}