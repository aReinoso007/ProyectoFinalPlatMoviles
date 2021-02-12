import { Profesion } from './profesion';
export class PrestadorServicios{

    uid: string;
    nombre: string;
    apellido: string;
    cedula: string;
    email: string;
    contrasenia: string;
    profesion: Profesion;
    deleted: boolean;
    createdAt: number;
    emailVerified: boolean;
}