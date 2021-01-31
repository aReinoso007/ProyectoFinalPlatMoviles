import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Direccion } from '../model/direccion';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(
    private platform: Platform,
    public afs: AngularFirestore
    ) { 
  }

  async getCurrentLocation(withAddress: boolean = true): Promise<any> {
    let location: any = {};

    return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      var options = {
        frequency: 1000,
        timeout: 15000,
        enableHighAccuracy: true
      };
      navigator.geolocation.getCurrentPosition(
        position => {
          location.latitude = position.coords.latitude;
          location.longitude = position.coords.longitude;
          if (withAddress) {
            let geocoder = new google.maps.Geocoder();
            let latlng = { lat: location.latitude, lng: location.longitude };
            geocoder.geocode({ location: latlng }, (results, status) => {
              if (results != null && results != undefined) {
                location.address = results[0].formatted_address;
              } //end if
              resolve(location);
            });
          } else {
            resolve(location);
          } //end if
        },
        error => {
          resolve(null);
        },
        options
      );
    } //end if
  });
  } 

  async getAddressOfLocation(location: any) {
    let geocoder = new google.maps.Geocoder();
    let latlng = { lat: location.latitude, lng: location.longitude };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (results != null) {
        location.address = results[0].formatted_address;
        console.log(location.address);
        return location.address;
      } 
    });
  } 

  getDirecciones(): Observable<Direccion[]>{
    return this.afs.collection<Direccion>("direccion").valueChanges();
  }

  
}
