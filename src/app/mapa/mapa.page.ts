import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Direccion } from '../model/direccion';
import { GeolocationService } from '../services/geolocation.service';
import { NotificacionesService } from '../services/notificaciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  /* De Taisha*/
  lat = -2.383980;
  long = -77.503930;
  zoom=7;
  direcciones: Observable<any[]>;

  currentLocation: any = {
    latitude: null,
    longitude: null,
    street: "",
    active: true
  };

  centerLocation: any = {
    latitude: null,
    longitude: null,
    address: "",
  };

  icons = {
    client: "https://cdn1.iconfinder.com/data/icons/ecommerce-61/48/eccomerce_-_location-48.png",
    shop: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Outside-Chartreuse.png",
    center: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Inside-Chartreuse.png",
    pointer: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Ball-Azure.png"
  };

  markers = [

    {

        lat: 21.1594627,

        lng: 72.6822083,

        label: 'Surat'

    },

    {

        lat: 23.0204978,

        lng: 72.4396548,

        label: 'Ahmedabad'

    },

    {

        lat: 22.2736308,

        lng: 70.7512555,

        label: 'Rajkot'

    }

];

  constructor(
    private locationService: GeolocationService,
    private nS: NotificacionesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    this.direcciones = this.locationService.getDirecciones();
    console.log(this.direcciones);
  }

 

}
