import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/usuario';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: Usuario = new Usuario();
  email: string;
  password: string;

  constructor(
    private router: Router, 
    private authService: AuthService
    ) { }

  ngOnInit() {
  }

  async login(){
    let error = await this.authService.emailPasswordLogin(this.email, this.password, 'usuario')
    if(error === undefined ){
      this.router.navigate(['dashboard']);
    }else {
      alert(JSON.stringify(error));
    }

  }

}
