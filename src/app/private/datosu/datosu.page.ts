import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Userinfo } from 'src/app/model/userInfo';
import { AuthService } from 'src/app/services/auth.service';
import { UserinfoService } from 'src/app/services/userinfo.service';

@Component({
  selector: 'app-datosu',
  templateUrl: './datosu.page.html',
  styleUrls: ['./datosu.page.scss'],
})
export class DatosuPage implements OnInit {

  user: any;

  userInfo: Userinfo = new Userinfo();

  constructor(
    private authService: AuthService,
    private userInfoService: UserinfoService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.authService.user$.subscribe(data =>{
      this.user = data;
      this.userInfo.uid_usuario = data.uid;
    })
    console.log(this.user);
  }

  addUserInfo(){
    this.userInfoService.addUserData(this.userInfo);
    this.toast('Exito en registro');
    this.router.navigate(['dashboard']);
  }

  async toast(text: string, duration: number = 2000, position?){
    const toast = await this.toastController.create({
      message: text,
      position: position || 'middle',
      duration: duration
    });
    toast.present();
  }

}
