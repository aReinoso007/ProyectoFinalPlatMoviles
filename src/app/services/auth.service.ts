import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import {  switchMap, first, take, map } from "rxjs/operators";
import { User } from '../model/user';

//import { GooglePlus } from '@ionic-native/google-plus';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<any>;
  user: User;
  userData: User;
  loading: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public platform: Platform,
    private loadingController: LoadingController,
    private toastController: ToastController,
    public ngZone: NgZone,
    public router: Router,
    private loadingCtrl: LoadingController
    //private googlePlus: GooglePlus
  ) { 
    this.user$ = this.afAuth.authState
    .pipe(
      switchMap(user => {
        if(user){
          return this.afs.doc<any>(`usuario/${user.uid}`).valueChanges();
        }else{
          return of(null);
        }
      })
    );
  }

  async getCurrentUser(): Promise<any>{
    return this.user$.pipe(first()).toPromise();
  }

  async toast(message, status){
    const toast = await this.toastController.create({
      message: message,
      color: status,
      position: 'top',
      translucent: true

    })
  }

  async registerUser(name: string, email: string, password: string): Promise<any>{
    try{
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = await this.afAuth.currentUser;
      return await user.updateProfile({
        displayName: name,
        photoURL: "https://goo.gl/7kz9qG"
      });
    }catch(err){
      console.error("Error" +  JSON.stringify(err));
      return err;
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (err) {
      return err;
    } 
  } 

  async logout(): Promise<any> {
    return this.afAuth.signOut();
  } 

/****************************************** LOGIN WITH GOOGLE ******************************************/
/*
async googleLogin() {
  if (this.platform.is("cordova")) {
    return await this.nativeGoogleLogin();
  } else {
    return await this.webGoogleLogin();
  }
}

async nativeGoogleLogin(): Promise<void> {
  try {
    const gplusUser: any = await this.googlePlus.login({
      webClientId: environment.googleWebClientId,
      offline: true
    });
    const googleCredential = firebase.default.auth.GoogleAuthProvider.credential(gplusUser.idToken);
    const firebaseUser = await firebase.default.auth().signInWithCredential(googleCredential);
    console.log(JSON.stringify(firebaseUser.user));
    return await this.updateUserData(firebaseUser.user, "google");
  } catch (err) {
    console.error("Error Login google - native" + JSON.stringify(err));
    return err;
  }
}*/

async webGoogleLogin(): Promise<void> {
  try {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return await this.updateUserData(credential.user, "google");
  } catch (err) {
    console.error("Error Login google - web" + JSON.stringify(err));
    return err;
  } 
}

/***************************************   EMAIL LOGIN *********************************/

async emailPasswordLogin(email: string, password: string, rol): Promise<void> {
  try {
    this.loading = await this.loadingCtrl.create({
      message: 'Espere..'
    });  
    const emailCredential = firebase.default.auth.EmailAuthProvider.credential(email, password);
    const firebaseUser = await firebase.default.auth().signInWithCredential(emailCredential);
    if(rol == 'user'){
      this.loading.dismiss();
      return await this.updateUserData(firebaseUser.user, "email");
    }else {
      this.loading.dismiss();
      return await this.updateUserData(firebaseUser.user, "email");
    }
    
  } catch (err) {
    this.loading.dismiss();
    return err;
  } 
} 

userExists(email: string) {
  console.log("userExists" + email);
  return this.afs
    .collection("users", ref => ref.where("email", "==", email))
    .valueChanges()
    .pipe(first())
    .toPromise();
}

// Guardar datos del usuario en Firestore
async updateUserData(usertemp: any, provider: any) {
  console.log("update" + JSON.stringify(usertemp));
  const doc: any = await this.userExists(usertemp.email);
  console.log("doc" + JSON.stringify(doc));
  let data: any;
  let user: any = JSON.parse(JSON.stringify(usertemp));

  console.log("doc" + JSON.stringify(doc));
  if (doc == null || doc == "") {
    //Crear cuenta
    data = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || '',
      photoURL: user.photoURL || "https://goo.gl/7kz9qG",
      provider: provider,
      lastLogin: new Date(Number(user.lastLoginAt)) || new Date(),
      createdAt: new Date(Number(user.createdAt)) || new Date()
    };
  } else if (doc.active == false) {
    throw { error_code: 999, error_message: "Acceso denegado, servicio deshabilitado, consulte con el administrador." };
  } else {
    //Actualizar cuenta
    data = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || '',
      photoURL: user.photoURL || "https://goo.gl/7kz9qG",
      provider: provider,
      lastLogin: new Date(Number(user.lastLoginAt)) || new Date()
    };
  }

  console.log("data", JSON.stringify(data))
  const userRef = this.afs.collection<any>('users');

  return userRef.doc(`${user.uid}`).set(data, { merge: true });
} 











  async sendVerificationEmail(){
    return await firebase.default.auth().currentUser.sendEmailVerification()
            .then(()=>{
              this.router.navigate(['verify-email']);
            })
  }

  async loginEmailPassword(email: string, password: string){
    try{
      //const emailCredential = this.afAuth.signInWithEmailAndPassword(email, password);
      return this.afAuth.signInWithEmailAndPassword(email, password);
    }catch(err){
      console.error(err);
    }
  }
  
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified ! == false) ? true: false;
  }


  SetUserData(user: User){
    console.log("uid auth service "+user.uid)
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuario/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }


  getCurrentUsr(){
    var user = firebase.default.auth().currentUser;
    const userData: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userData;
  }

} 
