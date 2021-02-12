import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Userinfo } from '../model/userInfo';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  constructor(
    private afs: AngularFirestore
  ) { }

  addUserData(userinfo: Userinfo){
    const refInfo = this.afs.collection('users')
    userinfo.uid = this.afs.createId();
    const param = JSON.parse(JSON.stringify(userinfo));
    refInfo.doc(userinfo.uid_usuario).collection<any>("infoUsuarios").doc(userinfo.uid).set(param, {merge: true});
  }
}
