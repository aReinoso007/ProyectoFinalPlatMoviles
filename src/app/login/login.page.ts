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
  email: string = "";
  password: string = "";

  constructor(
    private router: Router, 
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.email = "";
    this.password = "";
    console.log(localStorage.getItem('user'));
  }

  onLogin(){
    this.authService.loginEmailPassword(this.email, this.password)
    .then((res)=>{
      this.router.navigate(['dashboard']);
      
    }).catch((err)=>{
      window.alert(err.message)
    })
    console.log(localStorage.getItem('user'));

  }

}
