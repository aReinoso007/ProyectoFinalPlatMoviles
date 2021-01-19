import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../model/usuario';
import { async } from '@angular/core/testing';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(private router: Router, private usuarioLogin: UsuarioService) { }

  ngOnInit() {
  }

  async onLogin(){
    const usuario = await this.usuarioLogin.onLogin(this.usuario);
    if(usuario){
      console.log('Login Exitoso');
      this.router.navigateByUrl('/');
      
    }

  }

}
