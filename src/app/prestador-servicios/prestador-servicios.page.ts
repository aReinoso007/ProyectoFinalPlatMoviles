import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PrestadorServicios } from '../model/prestadorServicios';
import { PrestadorServiciosService } from '../services/prestador-servicios.service';

@Component({
  selector: 'app-prestador-servicios',
  templateUrl: './prestador-servicios.page.html',
  styleUrls: ['./prestador-servicios.page.scss'],
})
export class PrestadorServiciosPage implements OnInit {

  usuario: PrestadorServicios = new PrestadorServicios();
  contrasena: string;
  contrasena2: string;
  showPassword = false;

  email: string = "";
  password: string = "";

  passwordToggleIcon = 'eye';
  estado: boolean = false;

  constructor(public router: Router, private route: ActivatedRoute, public  prestadorService: PrestadorServiciosService,public authService: AuthService) {

    this.route.queryParams.subscribe(params => {
      console.log(params);
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.usuario = this.router.getCurrentNavigation().extras.queryParams.user;
        console.log(this.usuario);
      }
    });
    }
   

  ngOnInit() {
  }


  async registerPrestador(){
    this.email = this.usuario.email;
    this.authService.registerUser(this.email, this.contrasena, 'prestador')
    .then((res)=>{
      this.authService.sendVerificationEmail();
      console.log("email verificacion enviado")
      this.router.navigate(['/confirmacion']);
      console.log(res);
    }).catch((err)=>{
      window.alert(err.message);
    })

  }

}
