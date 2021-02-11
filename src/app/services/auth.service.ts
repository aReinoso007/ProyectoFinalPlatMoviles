import { User } from '../interfaces/user';
import { Usuario } from './../model/usuario';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    public afs: AngularFirestore,
    public agnfireAuth: AngularFireAuth
  ) { 
    this.agnfireAuth.authState.subscribe(user => {
      if(user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      }else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  registerUser(email: string, password: string){
    return this.agnfireAuth.createUserWithEmailAndPassword(email, password);
  }

  setUserData(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      nombre: user.nombre,
      apellido: user.apellido,
      fechaNacimiento: user.fechaNacimiento,
      genero: user.genero,
      emailVerified: user.emailVerified,
      deleted: user.deleted,
      createdAt: user.createdAt
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  
}
