import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController, MenuController, Events, ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Usuario, Car } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/service/cliente/user.service';
import { ModalSolicitarPage } from '../modal-solicitar/modal-solicitar.page';
import { CarService } from '../../../service/cliente/car.service';
import { ModalAlertAgregarAutoPage } from '../modal-alert-agregar-auto/modal-alert-agregar-auto.page';


declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mapRef = null;
  private usuario: Usuario = {};
  cars: Car[] = [];

  constructor(
    public events: Events,
    private geolocation: Geolocation,
    public alertController: AlertController,
    private menu: MenuController,
    private loadCtrl: LoadingController,
    private userService: UserService,
    private modalCtrl: ModalController,
    private carService: CarService,
    ) {

  }

  ngOnInit() {

    this.menu.enable(true , 'content');
    setTimeout(async () => {
      this.usuario = await this.userService.getUsuario();
      console.log('Este es el usuario malo', this.usuario);
      this.loadMap();
    }, 500);
  }
  openFirst() {
    this.menu.enable(true, 'content');
    this.menu.open('content');
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
  // #region Cargar Datos

 async abrirModal () {

  this.carService.getCarsPlans().subscribe( async resp => {
    this.cars = resp['cars'];
    if ( this.cars.length ) {
      const modal = await this.modalCtrl.create({
        component: ModalSolicitarPage,
        cssClass: '',
        componentProps: {
        nombre: this.cars
      }
      });
      await modal.present();
    } else {
      const modal = await this.modalCtrl.create({
        component: ModalAlertAgregarAutoPage,
        cssClass: 'modal-alert-css',
        componentProps: {
        nombre: this.cars
      }
      });
      await modal.present();
    }
  });
  }
}
