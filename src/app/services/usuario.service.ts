import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { merge, Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { AngularFireAuth } from '@angular/fire/auth';

//import { User } from '@app/shared/models/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public isLogged: any = false;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {

    afAuth.authState.subscribe(user => (this.isLogged =user));
   }

   //login metodos

   async onLogin (usuario1: Usuario){
     try{
       return null;

     }catch (error){
        console.log('Error en Login', error);
      
     }
   }




   // registro metodos

  

  registrarUsuario(usuario: Usuario){
    const refContacto = this.afs.collection("usuario");

    if (usuario.uid == null ){
      usuario.uid = this.afs.createId();
      usuario.deleted = false;
    }
    refContacto.doc(usuario.uid).set(Object.assign({}, usuario), {merge: true})
  }

  getUsuarios(): Observable<any[]>{
    return this.afs.collection("usuario").valueChanges();
  }
}

