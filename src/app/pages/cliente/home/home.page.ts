import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController, MenuController, Events, ModalController, Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Usuario, Car } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/service/cliente/user.service';
import { ModalSolicitarPage } from '../modal-solicitar/modal-solicitar.page';
import { CarService } from '../../../service/cliente/car.service';
import { ModalAlertAgregarAutoPage } from '../modal-alert-agregar-auto/modal-alert-agregar-auto.page';
import { GoogleMap, Geocoder, GoogleMaps, Marker, MyLocation, GeocoderRequest, LatLng, GeocoderResult, GoogleMapsAnimation } from '@ionic-native/google-maps/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { environment } from 'src/environments/environment';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private usuario: Usuario = {};
  cars: Car[] = [];

  map: GoogleMap;
  public address: string;
  public lat;
  public lng;
  public locat: string;
  public city: string;

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
    private nativeGeocoder: NativeGeocoder
  ) {

  }

  ngOnInit() {
    this.menu.enable(true, 'content');
    setTimeout(async () => {
      this.usuario = await this.userService.getUsuario();
      console.log('Este es el usuario malo', this.usuario);
      await this.loadMap();
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
    // loading.present();
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
      // this.lat = location.latLng.lat;
      // this.lng = location.latLng.lng;
      // this.addMarker(this.lat, this.lng);
      // console.log('lat, lng', this.lat, this.lng);
      environment.lat = location.latLng.lat;
      environment.lng = location.latLng.lng;
      this.addMarker(environment.lat,  environment.lng);
      console.log('lat, lng', environment.lat, environment.lng);
    })
      .catch(err => {
        console.log('error', err);
      });
  }
  // #endregion

  // #region AGREGAR MARCADOR
  async addMarker(lat, lng) {
    this.map.clear();
    // Move the map camera to the location with animation
    const targ = { lat, lng };
    this.map.animateCamera({
      target: targ,
      zoom: 19,
      duration: 3000
    });
    // Pone marcardor de ubicacion
    const marker: Marker = this.map.addMarkerSync({
      position: { lat, lng },
      // map: this.map,
      icon: 'red',
      animation: GoogleMapsAnimation.BOUNCE,
      title: 'Ubicación Actual'
    });

    await this.doGeocode(marker, lat, lng);
  }
  //#endregion

  // #region Obtener direccion
  doGeocode(marker, lat, lng) {
    const request: GeocoderRequest = {
      position: new LatLng(lat, lng),
    };
    this.geocoder.geocode(request)
      .then((results: GeocoderResult[]) => {
        console.log('localy', results[0]);

         this.address = [
          (results[0].thoroughfare || "") + " " + (results[0].subThoroughfare || ", "),
          results[0].locality
        ].join(", ");
        environment.address = this.address;
        console.log("data_: ", environment.address);
        this.city = results[0].locality;
        marker.setTitle(this.address);
        marker.showInfoWindow();
      });
  }
  // #endregion

  // #region BUSCAR POR DIRECCION
  forwardGeocode(keyword: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.nativeGeocoder.forwardGeocode(keyword)
        .then((result: GeocoderResult[]) => {
          // this.lat = result[0].latitude;
          // this.lng = result[0].longitude;
          environment.lat = result[0].latitude;
          environment.lng = result[0].longitude;
          console.log('datasad', result);
          console.log('direccicones',  environment.lat,  environment.lng);

          // this.addMarker(this.lat, this.lng);
          this.addMarker( environment.lat,  environment.lng);
          resolve();
        })
        .catch((error: any) => {
          console.log(error);
          reject(error);
        });
    });
  }
  // #endregion

  onClick() {
    console.log(this.locat);
    const locat2 = this.locat + ' ' + this.city;
    this.forwardGeocode(locat2);
    // environment.address = 'hola bebe';
  }
}
