import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: any;
  proveedores = [];
  solicitud: Observable<any[]>;
  resultados = [];
  constructor(
    public authService: AuthService,
    public usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.authService.user$.subscribe(user=>{
      this.user = user;
      if(user != null ){
        
      }
    })
  }

  /*
  setUserData(){
    this.usuario = this.authService.getCurrentUsr()
    this.usuarioN = this.authService.user$
    console.log("data de usuario suscrita "+this.usuarioN);

  }


  updateUserData(){
    this.user.email = this.usuario.email;
    this.user.uidMail = this.usuario.uid;
    this.usuarioService.registerUserWithEmail(this.user);
    window.alert("Datos actualizados correctamente")
  }
  */

}
