import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { first, switchMap } from "rxjs/operators";
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;
  user: User;
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public platform: Platform,
    private loadingController: LoadingController,
    private toastController: ToastController,
    public ngZone: NgZone,
    public router: Router
  ) { 

    this.afAuth.authState.subscribe(user => {
      if(user){
        this.userData = user;
        console.log("user data auth "+this.userData);
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      }else{
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })

    /*this.user$ = this.afAuth.authState
    .pipe(
      switchMap(user => {
        if(user){
          return this.afs.collection(`usuario/${user.uid}`).valueChanges();
        }else{
          return of(null);
        }
      //})
    )*/
  }

  async toast(message, status){
    const toast = await this.toastController.create({
      message: message,
      color: status,
      position: 'top',
      translucent: true

    })
  }

  registerUser(email: string, password: string){
    try{
      return this.afAuth.createUserWithEmailAndPassword(email, password);
    }catch(err){
      console.error("error registro "+err);
    }
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

  /* sign in with Gmail my dude */
  /*
  GoogleAuth(){
    return this.AuthLogin(new firebase.default.auth.GoogleAuthProvider());
  }

  async AuthLogin(provider){
    return await this.afAuth.signInWithPopup(provider)
            .then((result)=>{
              this.ngZone.run(()=> {
                this.router.navigate(['dashboard']);
              })
              this.SetUserData(result.user);
            }).catch((err)=>{
              window.alert(err);
            })
  }*/

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

  async singOut(){
    return await this.afAuth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.router.navigate(['login']);
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

  /*
  public user: Observable<any>;
  loading: any;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private googlePlus: GooglePlus,
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

  async registerUser(nombre: string, email: string, password: string){
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

  async resetPassword(email: string): Promise<void>{
    try{
      return this.afAuth.sendPasswordResetEmail(email);
    }catch(error){
      console.error("Error: "+error);
    }
  }

  async logout(): Promise<any>{
    return this.afAuth.signOut();
  }

  async login(email: string, password: string){
    try{
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    }catch(error){
      
    }
  }
  

  /* Login Con Google */


  /* Login Correo y contrasena*/
  
  /* 
  async emailPasswordLogin(email: string, password: string, rol): Promise<void>{
    try{
      this.loading = await this.loadingController.create({
        message: "Espere por favor.."
      });
      await this.loading.present();
      const emailCredential = 
    }catch(error){

    }
  }
  */

} 
