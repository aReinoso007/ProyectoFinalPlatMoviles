import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { merge, Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public afs: AngularFirestore) { }

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

