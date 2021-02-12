import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { merge, Observable } from 'rxjs';
import { PrestadorServicios } from '../model/prestadorServicios';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class PrestadorServiciosService {

  public isLogged: any = false;
  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {

    afAuth.authState.subscribe(prestador => (this.isLogged = prestador));
   }

   //login metodos

   async onLogin (email: string, contrasena: string){
    try{
      return await this.afAuth.signInWithEmailAndPassword(email, contrasena);

    }catch (error){
       console.log('Error del Login', error);
     
    }
  }

  registrarUsuario(usuario: PrestadorServicios, email: string, password: string){
    const refContacto = this.afs.collection("usuario");

    if (usuario.uid == null ){
      usuario.uid = this.afs.createId();
      usuario.deleted = false;
      firebase.default.auth().createUserWithEmailAndPassword(email, password)
      .then((user)=> {
        console.log('creado exitosamente')
      })
      .catch((error)=>{
        var errorCode = error.code;
        var errorMesssage = error.message;
        console.log('codigo de error: '+ errorCode + 'mensaje: '+ errorMesssage);
      });
    }
    refContacto.doc(usuario.uid).set(Object.assign({}, usuario), {merge: true})
  }
}
