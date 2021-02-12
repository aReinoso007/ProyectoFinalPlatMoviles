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
  showPassword = false;

  email: string;
  nombre: string;
  contrasena: string;

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
  
  //esta funcion se esta usando
  async registerUser(){
    this.email = this.usuario.email;
    this.authService.registerUser(this.nombre, this.email, this.contrasena)
    .then((res)=>{
      this.authService.sendVerificationEmail();
      this.router.navigate(['/confirmacion']);
      console.log("respuesta del registro: "+res);
    }).catch((err)=>{
      window.alert(err.message);
    })
  }

  async registro(){
    let error = await this.authService.registerUser(this.nombre, this.email, this.contrasena)
    if (this.nombre == undefined || this.email == undefined || this.contrasena == undefined){
      alert("Todos los campos son obligatorios")
    }else{
      if(error === undefined ){
        this.authService.emailPasswordLogin(this.email, this.contrasena, 'user').then(res =>{
          this.router.navigate(['login']);
          alert("cuenta creada exitosamente ");
        })
      }else {
        let e = JSON.stringify(error)
        if (e.includes('The email address is badly formatted'))
          alert("Debe ingresar un correo válido")
        if (e.includes('Password should be at least 6 characters'))
          alert("La contraseña debe tener por lo menos 6 caracteres")
      }
    }
  }

}
