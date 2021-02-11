
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { Usuario } from '../model/usuario';
import { first, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<any>;
  loading: any;
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { 
    this.user = this.afAuth.authState
    .pipe(
      switchMap( user => {
        if(user){
          return this.afs.doc<Usuario>(`users/${user.uid}`).valueChanges();
        }else {
          return of(null);
        }
      }

      )
    )
  }

  async getCurrentUser(): Promise<any>{
    return this.user.pipe(first()).toPromise();
  }

  async register(nombre: string, email: string, password: string){
    try{
      this.loading = await this.loadingController.create({
        message: "Espere por favor..."
      });
      await this.loading.present();
      await this.afAuth.createUserWithEmailAndPassword(email, password);

      const user = await this.afAuth.currentUser;
      this.loading.dismiss();
      return await user.updateProfile({
          displayName: nombre,
          photoURL: "https://www.pepperhub.in/wp-content/uploads/2020/11/user-male.png"
      });
    }catch(error){
      console.error("Error"+JSON.stringify(error));
      this.loading.dismiss();
      return error;
    }
  }

  async login(email: string, password: string){
    try{
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    }catch(error){
      
    }
  }

}
