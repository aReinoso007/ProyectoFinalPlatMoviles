import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../model/usuario';
import { async } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: Usuario = new Usuario();
  email: string = "";
  password: string = "";

  constructor(
    private router: Router, 
    private usuarioLogin: UsuarioService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    console.log(localStorage.getItem('user'));
  }

  onLogin(){
    this.authService.loginEmailPassword(this.email, this.password)
    .then((res)=>{
      
    }).catch((err)=>{
      window.alert(err.message)
    })
    console.log(localStorage.getItem('user'));

  }

}
