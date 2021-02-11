import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Direccion } from '../model/direccion';
import { GeolocationService } from '../services/geolocation.service';
import { NotificacionesService } from '../services/notificaciones.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  /* De Taisha*/
  title = 'AGM (Angular google maps)';
  lat = -2.383980;
  long = -77.503930;
  zoom=7;
  direcciones: Observable<any[]>;
  direccion: Direccion = new Direccion();

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
    private ns: NotificacionesService,
    private route: ActivatedRoute,
    private router: Router,
    public usuarioService: UsuarioService,
  ) { 
    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.direccion = this.router.getCurrentNavigation().extras.queryParams.direccion;
      }
    });
  }

  async ngOnInit() {
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

  newAddress(event: any) {
    if (event) {
      this.centerLocation.latitude = event.lat;
      this.centerLocation.longitude = event.lng;
      this.locationService.getAddressOfLocation(this.centerLocation);
      this.direccion.longitud = event.lng;
      this.direccion.latitud = event.lat;
      
      //this.centerLocation.address = this.centerLocation;
    } //end if
  }

  saveAddress(){
    this.usuarioService.saveLocation(this.direccion);
    let navigationExtras: NavigationExtras ={
      queryParams: {
        direccion: this.direccion
      }
    };
    this.router.navigate(['/mapa'], navigationExtras);
    alert("Direccion guardada");
  }
  

 

}
