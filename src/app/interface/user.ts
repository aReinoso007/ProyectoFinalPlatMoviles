export interface User {
    uid: string;
    nombre: string;
    apellido: string;
    numeroCedula: string;
    fechaNacimiento: Date;
    email: string;
    password: string;
    profesional: boolean;
    deleted: boolean;
    genero: string;
    rol: string;
    photoURL: string;
    createdAt: number;

}
