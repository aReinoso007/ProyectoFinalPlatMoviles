import { Profesion } from './profesion';
export class Usuario {

    uid: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    email: string;
    deleted: boolean;
    genero: string;
    createdAt: number;
    emailVerified: boolean;

    /*constructor(nombre: string, apellido: string, numeroCedula: string, fechaNacimiento: Date, email: string, pass: string, profesional: boolean) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.numeroCedula = numeroCedula;
        this.fechaNacimiento = fechaNacimiento;
        this.email = email;
        this.password = pass;
        this.profesional = profesional;
    }*/
}
