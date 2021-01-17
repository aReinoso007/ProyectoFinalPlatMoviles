import { Profesion } from './profesion';
export class Usuario {

    uid: string;
    public nombre: string;
    public apellido: string;
    public numeroCedula: string;
    public fechaNacimiento: Date;
    public email: string;
    public password: string;
    public profesional: boolean;
    public deleted: boolean;
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
