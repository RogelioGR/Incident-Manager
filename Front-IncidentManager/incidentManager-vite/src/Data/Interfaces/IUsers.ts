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