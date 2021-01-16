import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  estado: boolean = false;
  constructor(public router: Router, private route: ActivatedRoute,public  usuarioService: UsuarioService
    ) { }

  ngOnInit() {
  }

  registrarNuevoUsuario(){
    this.usuarioService.registrarUsuario(this.usuario);
    console.log('usuario registrado con exito!');
  }

  verificarContrasena(pass1: string, pass2: string){
    pass1 = this.usuario.password.toString();
    pass2 = this.contrasena.toString();
    if(pass1 == pass2){
      this.estado = true;
      return this.estado;
    }
    else{
      return this.estado;
    }

  }

}
