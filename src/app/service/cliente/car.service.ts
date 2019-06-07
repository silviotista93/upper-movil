import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { NavController } from '@ionic/angular';
import { Car, Brand } from 'src/app/interfaces/interfaces';
import { UiServiceService } from '../ui-service.service';
import { Subject } from 'rxjs';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';


@Injectable({
  providedIn: 'root'
})

export class CarService {

  image;
  URL = environment.url;
  token: string = null;

  public car: Car = {};
  brand: Brand = {};

  newCar = new EventEmitter<Car>();
  newPost: Subject<Car> = new Subject<Car>();

  streamPost(car: Car) {
    this.newPost.next(car);
  }

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private uiService: UiServiceService,
    private navCtrl: NavController,
    private fileTransfer: FileTransfer) { }


  // #region OBTENER CARROS
  getCars() {
    const headerToken = new HttpHeaders({
      'Authorization': this.userService.token,
    });
    return this.http.get(`${this.URL}/api/car/cars`, { headers: headerToken });
  }
   getCarsPlans() {
     const headerToken = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': this.userService.token,
     });
     return this.http.get(`${this.URL}/api/car/cars-plans`, { headers: headerToken });
   }

  //  getPlanTypeWashes(id: string) {
  //   const data = { id };
  //   const headerToken = new HttpHeaders({
  //     'Authorization': this.userService.token,
  //   });
  //   return  this.http.post(`${this.URL}/api/car/plan-type-washes`, data, { headers: headerToken })
  //       .subscribe(async resp => {
  //         console.log(resp);
  //         return resp['plan-type-washes'];
  //       }, err => {
  //       });
  //  }
  // #endregion

  // #region OBTENER MARCAS/BRANDS
  getBrand() {
    const headerToken = new HttpHeaders({
      'Authorization': this.userService.token,
    });
    return this.http.get(`${this.URL}/api/car/brand`, { headers: headerToken });
  }
  // #endregion

  // #region OBTENER COLOR
  getColor() {
    const headerToken = new HttpHeaders({
      'Authorization': this.userService.token,
    });
    return this.http.get(`${this.URL}/api/car/color`, { headers: headerToken })
  }
  // #endregion

  // #region OBTENER TIPO CARRO
  getCarType() {
    const headerToken = new HttpHeaders({
      'Authorization': this.userService.token,
    });
    return this.http.get(`${this.URL}/api/car/car-type`, { headers: headerToken })
  }
  // #endregion

  // #region OBTENER CILINDRAJE
  getCilindraje() {
    const headerToken = new HttpHeaders({
      'Authorization': this.userService.token,
    });
    return this.http.get(`${this.URL}/api/car/cilindraje`, { headers: headerToken })
  }
  // #endregion

  // #region valida token
  validateToken() {
    this.token = this.userService.token;

    return new Promise(resolve => {
      const headerToken = new HttpHeaders({
        'Authorization': this.userService.token,
      });
      this.http.get(`${this.URL}/api/car/cars`, { headers: headerToken })
        .subscribe(resp => {
          if (resp['cars']) {
            console.log('Car valida token ', resp);
            this.car = resp['cars'];
            console.log('estos son los carros ', this.car);
            resolve(true);
          } else {
            // this.navCtrl.navigateRoot('/login');
            console.log('else de la promesa');
            resolve(false);
          }
        });
    });
  }
  // #endregion


  // #region Crear Carro
  createCar(car: Car) {

    const headerToken = new HttpHeaders({
      'Authorization': this.userService.token,
    });
    console.log('car service', this.userService.token);

    return new Promise(resolve => {
      this.http.post(`${this.URL}/api/car/create-car`, car, { headers: headerToken })
        .subscribe(async resp => {
          if (resp['car']) {
            this.uiService.successToast(resp['message']);
            this.streamPost(resp['car']);
            this.navCtrl.navigateRoot('/menu/autos', { animated: true });
            resolve(true);
          } else {
            this.uiService.successToast(resp['No se creo el carro']);
            resolve(false);
          }
        },
          async err => {
            console.log('esta es la respuesta error');
            console.log(err);

            if (err['error']["errors"]) {
              const errores = err['error']["errors"];
              let msgError = "";

              Object.keys(errores).map(error => {
                const detalle = errores[error][0];
                msgError += `${detalle}\n`;
              });
              if (msgError !== "") {
                this.uiService.errorToast(msgError);
              }
              resolve(true);
            }
            resolve(false);
          });
    });
  }
  // #endregion


  // #region Subir Foto
  uploadPicture(img: string) {

    const options: FileUploadOptions = {
      fileKey: 'picture',
      headers: { 'Authorization': this.userService.token }
    }
    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload(img, `${this.URL}/api/car/upload-picture`, options)
      .then(data => {
        this.image = data.response;
        console.log('imgen2', this.image);
      }).catch(err => {
        console.log('error', err)
      });
  }
  // #endregion


}
