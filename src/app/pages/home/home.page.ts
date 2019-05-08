import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController, MenuController, Events } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/service/user.service';


declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mapRef = null;
  private usuario: Usuario = {};

  constructor(
    public events: Events,
    private geolocation: Geolocation,
    public alertController: AlertController,
    private menu: MenuController,
    private loadCtrl: LoadingController,
    private userService: UserService, ) {

  }

  ngOnInit() {

    this.menu.enable(true);
    setTimeout(() => {
      this.usuario = this.userService.getUsuario();
      console.log('Este es el usuario malo', this.usuario);
      this.loadMap();
    }, 500);
  }


  //#region Logica de mapas
  async loadMap() {
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      const myLatLng = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      console.log(myLatLng);
      const mapEle: HTMLElement = document.getElementById('map');
      this.mapRef = new google.maps.Map(mapEle, {
        center: myLatLng,
        zoom: 18,
        disableDefaultUI: true
      });
      google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
        loading.dismiss();
        this.addMarker(resp.coords.latitude, resp.coords.longitude);
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    const rta = this.geolocation.getCurrentPosition();
  }

  ubicacionActual() {
    this.geolocation.getCurrentPosition().then((resp) => {
      const myLatLng = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      console.log(myLatLng);
      const mapEle: HTMLElement = document.getElementById('map');
      this.mapRef = new google.maps.Map(mapEle, {
        center: myLatLng,
        zoom: 18,
        disableDefaultUI: true
      });
      google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
        this.addMarker(resp.coords.latitude, resp.coords.longitude);
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  private addMarker(lat: number, lng: number) {
    const image = '/assets/iconos/ubicacion.png';
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      icon: image,
      animation: google.maps.Animation.BOUNCE,
      title: 'Ubicación Actual'
    });
  }
  //#endregion


}
