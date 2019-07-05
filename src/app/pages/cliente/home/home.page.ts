import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController, MenuController, Events, ModalController, Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Usuario, Car } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/service/cliente/user.service';
import { ModalSolicitarPage } from '../modal-solicitar/modal-solicitar.page';
import { CarService } from '../../../service/cliente/car.service';
import { ModalAlertAgregarAutoPage } from '../modal-alert-agregar-auto/modal-alert-agregar-auto.page';
import { GoogleMap, Geocoder, GoogleMaps, Marker, MyLocation, GeocoderRequest, LatLng, GeocoderResult } from '@ionic-native/google-maps/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

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

  map: GoogleMap;
  address: string;

  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 3
  };

  constructor(
    public events: Events,
    private geolocation: Geolocation,
    public alertController: AlertController,
    private menu: MenuController,
    private loadCtrl: LoadingController,
    private userService: UserService,
    private modalCtrl: ModalController,
    private carService: CarService,
    private geocoder: Geocoder,
    private platform: Platform,
  ) {

  }

  async ngOnInit() {

    this.menu.enable(true, 'content');
    // await this.platform.ready();
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
  // async loadMap() {
  //   const loading = await this.loadCtrl.create({
  //     spinner: 'crescent'
  //   });
  //   loading.present();
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     const myLatLng = {
  //       lat: resp.coords.latitude,
  //       lng: resp.coords.longitude
  //     };
  //     console.log(myLatLng);
  //     const mapEle: HTMLElement = document.getElementById('map');
  //     this.mapRef = new google.maps.Map(mapEle, {
  //       center: myLatLng,
  //       zoom: 18,
  //       disableDefaultUI: true
  //     });
  //     google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
  //       loading.dismiss();
  //       this.addMarker(resp.coords.latitude, resp.coords.longitude);
  //     });
  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });
  //   const rta = this.geolocation.getCurrentPosition();
  // }

  // ubicacionActual() {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     const myLatLng = {
  //       lat: resp.coords.latitude,
  //       lng: resp.coords.longitude
  //     };
  //     console.log(myLatLng);
  //     const mapEle: HTMLElement = document.getElementById('map');
  //     this.mapRef = new google.maps.Map(mapEle, {
  //       center: myLatLng,
  //       zoom: 18,
  //       disableDefaultUI: true
  //     });
  //     google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
  //       this.addMarker(resp.coords.latitude, resp.coords.longitude);
  //     });
  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });
  // }

  // private addMarker(lat: number, lng: number) {
  //   const image = '/assets/iconos/ubicacion.png';
  //   const marker = new google.maps.Marker({
  //     position: { lat, lng },
  //     map: this.mapRef,
  //     icon: image,
  //     animation: google.maps.Animation.BOUNCE,
  //     title: 'Ubicación Actual'
  //   });
  // }
  //#endregion

  // #region Cargar Datos
  async abrirModal() {

    this.carService.getCarsPlans().subscribe(async resp => {
      this.cars = resp['cars'];
      if (this.cars.length) {
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
          },
          backdropDismiss: false
        });
        await modal.present();
      }
    });
  }
  // #endregion

  async loadMap() {
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();
    this.map = GoogleMaps.create('map_canvas');
    await this.goToMyLocation();
    loading.dismiss();
  }

  // #region ir a mi ubicacion
  async goToMyLocation() {
    this.map.clear();

    // Get the location of you
    this.map.getMyLocation().then(async (location: MyLocation) => {
      console.log(JSON.stringify(location, null, 2));

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 15,
        duration: 5000
      });
      // Pone marcardor de ubicacion
      const marker: Marker = this.map.addMarkerSync({
        title: '',
        icon: 'red',
        animation: 'DROP',
        position: location.latLng
      });

      const lat = location.latLng.lat;
      const lng = location.latLng.lng;
      await this.doGeocode(marker, lat, lng);


      console.log('lat, lng', lat, lng);
    })
      .catch(err => {
        // this.showToast(err.error_message);
        console.log('error', err);
      });
  }
  // #endregion

  // async showToast(message: string) {
  //   const toast = await this.toastCtrl.create({
  //     message,
  //     duration: 2000,
  //     position: 'middle'
  //   });
  //   toast.present();
  // }

  doGeocode(marker, lat, lng) {
    const request: GeocoderRequest = {
      position: new LatLng(lat, lng),
    };
    this.geocoder.geocode(request)
      .then((results: GeocoderResult[]) => {
        console.log('localy', results[0]);

        const address = [
          (results[0].thoroughfare || "") + " " + (results[0].subThoroughfare || ", "),
          results[0].locality
        ].join("");
        console.log("data_: ", address);
        marker.setTitle(address);
        marker.showInfoWindow();
      });
  }
}
