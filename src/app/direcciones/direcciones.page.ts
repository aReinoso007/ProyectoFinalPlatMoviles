import { Direccion } from './../model/direccion';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { GeolocationService } from '../services/geolocation.service';
import { NotificacionesService } from '../services/notificaciones.service';
import { UsuarioService } from '../services/usuario.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.page.html',
  styleUrls: ['./direcciones.page.scss'],
})
export class DireccionesPage implements OnInit {

  title = 'AGM (Angular google maps)';
  lat = -2.897458;
  lng = -79.004488;
  zoom = 7;
  direccion: Direccion = new Direccion();
  direcciones: Direccion[];

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



  constructor(
    private locationService: GeolocationService,
    private ns: NotificacionesService,
    public usuarioService: UsuarioService) {}

   async ngOnInit() {
    await this.listarDirecciones();
    console.log(this.direcciones);
    this.currentLocation = await this.locationService.getCurrentLocation(true);
    if (this.currentLocation == null || this.currentLocation == undefined){
      this.ns.notificacionToast('No se pudo determinar su ubucación automáticamente.');
      this.currentLocation ={
        latitude: -2.897458,
        longitude: -79.004488,
        street: "Centro histórico de Cuenca",
        active: true
      }
    }
  }

  newAddress(event) {
    if (event) {
      this.centerLocation.latitude = event.lat;
      this.centerLocation.longitude = event.lng;
      this.locationService.getAddressOfLocation(this.centerLocation);
      this.direccion.longitud = event.lng;
      this.direccion.latitud = event.lat;
      this.direccion.direccion = this.centerLocation.address;

    } 
  }

  saveAddress(){
    this.usuarioService.saveLocation(this.direccion);
    this.direccion = new Direccion();
    alert("Direccion guardada");
  }

  listarDirecciones(){
    this.locationService.getDirecciones()
    .subscribe(data => {
      this.direcciones = data;
    })
  }

}
