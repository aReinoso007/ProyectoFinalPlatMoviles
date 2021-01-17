import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.page.html',
  styleUrls: ['./confirmacion.page.scss'],
})
export class ConfirmacionPage implements OnInit {

  usuario: Usuario;
  worked: boolean;
  constructor(private route: ActivatedRoute, private router: Router) { 

    this.route.queryParams.subscribe(params =>{
      console.log(params);
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.usuario = this.router.getCurrentNavigation().extras.queryParams.usuario;
        console.log(this.usuario);
        this.worked = this.router.getCurrentNavigation().extras.queryParams.estado;
        console.log(this.worked)
      }
    })
  }

  ngOnInit() {
  }

}
