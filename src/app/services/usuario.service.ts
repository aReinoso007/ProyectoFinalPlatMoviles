import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { merge, Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { Direccion } from '../model/direccion';


//import { User } from '@app/shared/models/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public isLogged: any = false;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {

    afAuth.authState.subscribe(usuario => (this.isLogged = usuario));
   }

   //login metodos

   async onLogin (usuario: Usuario){
     try{
       return await this.afAuth.signInWithEmailAndPassword(usuario.email, usuario.password);

     }catch (error){
        console.log('Error del Login', error);
      
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

  getDirecciones(): Observable<any[]>{
    return this.afs.collection("direccion").valueChanges();
  }

  saveLocation(direccion: Direccion){
    const refDireccion = this.afs.collection("direccion");

    if(direccion.uid == null){
      direccion.uid = this.afs.createId();
    }
    refDireccion.doc(direccion.uid).set(Object.assign({}, direccion), {merge: true})
  }
}

