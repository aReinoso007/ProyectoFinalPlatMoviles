import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inicio',
      url: 'inicio',
      icon: 'home'
    },
    {
      title: 'Registrarse',
      url: '/registro',
      icon: 'paper-plane'
    },
    {
      title: 'Sing in',
      url: 'login',
      icon: 'heart'
    },
    {
      title: 'Direccion',
      url: '/direcciones',
      icon: 'archive'
    },
    {
      title: 'Lista Direccioes',
      url: 'mapa',
      icon: 'map'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  user: Observable<any>;
  id: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authService.getCurrentUser().then(user => {
        console.log("Usuario?: ", user);
        this.user = this.authService.user$;
        if(user){
          this.id = user.uid
          if(user.rol = 'user'){
            this.router.navigate(['inicio'])
          }else{
            this.router.navigate(['inicio']);
          }
        }else {
          this.router.navigate(['folder/inbox']);
        }
      })
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  async logOut(){
    await this.authService.logout();
    localStorage.clear();
    this.router.navigate(['folder/inbox']);
  }

  perfil(id){
    this.selectedIndex = 103;
    this.router.navigate([`perfil/${id}`])
  }
}
