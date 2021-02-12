import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  
  usuario: Usuario = new Usuario();
  contrasena: string;
  contrasena2: string;
  showPassword = false;

  email: string = "";
  password: string = "";

  passwordToggleIcon = 'eye';
  estado: boolean = false;
  constructor(
    public router: Router, 
    private route: ActivatedRoute,
    public  usuarioService: UsuarioService,
    public authService: AuthService
    ) { 
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

  togglePassword():void {
    this.showPassword =!this.showPassword;
    if(this.passwordToggleIcon == 'eye' ){
      this.passwordToggleIcon = 'eye-off'
    }else{
      this.passwordToggleIcon = 'eye';
    }
  }

  registrarNuevoUsuario(){
    this.email = this.contrasena;
    this.usuarioService.registrarUsuario(this.usuario, this.email, this.contrasena);
    console.log('usuario registrado con exito!');
    let navigationExtras: NavigationExtras = {
      queryParams: {
        usuario: this.usuario,
        estado: true
      }
    };
    this.router.navigate(['/confirmacion'], navigationExtras);
  }

  /*obSubmit(form: NgForm){
    if(this.form.ge)
  }*/
  
  async registerUser(){
    this.email = this.usuario.email;
    this.authService.registerUser(this.email, this.contrasena)
    .then((res)=>{
      this.router.navigate(['/confirmacion']);
      console.log(res);
    }).catch((err)=>{
      window.alert(err.message);
    })

  }

}
