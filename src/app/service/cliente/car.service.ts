import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { NavController, LoadingController, Platform } from '@ionic/angular';
import { Car, Brand } from 'src/app/interfaces/interfaces';
import { UiServiceService } from '../ui-service.service';
import { Subject } from 'rxjs';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';



@Injectable({
  providedIn: 'root'
})

export class CarService {

  carId: any;

  image: any = "";
  URL = environment.url;
  token: string = null;

  public car: Car = {};
  public first_car: Car = {};
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
    private loadCtrl: LoadingController,
    private fileTransfer: FileTransfer,
    public platform: Platform) { }


  // #region OBTENER CARROS
  getCars() {
    const headerToken = new HttpHeaders({
      'Authorization': this.userService.token,
    });
    return this.http.get(`${this.URL}/api/car/cars`, { headers: headerToken });
  }
  getCarsPayment() {
    const headerToken = new HttpHeaders({
      'Authorization': this.userService.token,
    });
    return this.http.get(`${this.URL}/api/payment/get-cars-plans`, { headers: headerToken });
  }

  getCarsPlans() {
    const headerToken = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': this.userService.token,
    });
    return this.http.get(`${this.URL}/api/car/cars-plans`, { headers: headerToken });
  }
  firstCar(id: any) {
    const headerToken = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.userService.token,
    });
    console.log(id);
    return new Promise((resolve, reject) => {
      this.http.get(`${this.URL}/api/payment/car-suscription/${id}`, { headers: headerToken })
        .subscribe(async resp => {
          resolve(resp);
          console.log(resp['car'])
        }, err => {
          reject(err);
        });
    });
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

  // #region Crear Carro
  async createCar(car: Car) {

    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });

    loading.present();

    const headerToken = new HttpHeaders({
      'Authorization': this.userService.token,
    });

    return new Promise(resolve => {
      this.http.post(`${this.URL}/api/car/create-car`, car, { headers: headerToken })
        .subscribe(async resp => {

          if (resp['car']) {
            this.uiService.successToast(resp['message']);
            this.streamPost(resp['car']);

            this.navCtrl.navigateRoot('/menu/autos', { animated: true });
            loading.dismiss();
            resolve(true);
          } else {
            this.uiService.successToast(resp['No se creo el carro']);
            loading.dismiss();
            resolve(false);
          }
        },
          async err => {
            loading.dismiss();
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
      .then(async (data) => {
        this.image = await data.response;
        console.log('imgen2', this.image);
      }).catch(err => {
        console.log('error', err)
      });
  }
  // #endregion

  // #region BORRAR AUTO
  async deleteCar(id) {
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();

    const headerToken = new HttpHeaders({
      'Authorization': this.userService.token,
    });

    return new Promise(resolve => {
      this.http.post(`${this.URL}/api/car/delete-car`, id, { headers: headerToken })
        .subscribe(resp => {
          //CORREGIR ELIMINAR
          console.log('idddddddd', id);
          this.uiService.successToast(resp['message']);
          console.log('Carro eliminado', resp['cars']);
          loading.dismiss();
          resolve(true);
        },
          async err => {
            loading.dismiss();
            console.log(err);
            console.log('idddddddd', id);

            console.log('NoOO eliminado el carro');
            this.uiService.errorToast('El auto no se elimino');

            resolve(false);
          });
    });
  }
  // #endregion

  // #region Obtener un solo carro
  getCar(id: any) {
    const headerToken = new HttpHeaders({
      'Authorization': this.userService.token,
    });
    return this.http.get(`${this.URL}/api/car/car/${id}`, { headers: headerToken });
  }
  //#endregion

  // #region ACTUALIZAR AUTO
  async updateCar(car) {
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });

    loading.present();
    const headerToken = new HttpHeaders({
      'Authorization': this.userService.token,
    });
    return new Promise(resolve => {

      this.http.put(`${this.URL}/api/car/update-car`, car, { headers: headerToken })
        .subscribe(resp => {

          console.log(resp);
          loading.dismiss();
          this.uiService.successToast(resp['message']);
          this.navCtrl.navigateRoot('/menu/autos', { animated: true });
          resolve(true);
        }, err => {
          console.log(err);
          loading.dismiss();
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
  //#endregion

  // #region ACTUALIZAR FOTO AUTO
  updatePicture(img: string, id) {
    const options: FileUploadOptions = {
      fileKey: 'picture',
      headers: { 'Authorization': this.userService.token },
      params: { 'id': id }
    }
    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    return new Promise(resolve => {
      fileTransfer.upload(img, `${this.URL}/api/car/update-picture`, options)
        .then(async (data) => {
          this.image = await data.response;
          console.log('imagen actualizada', this.image);
          resolve(true);
        }).catch(err => {
          console.log('error', err)
          resolve(false);
        });
    });
  }
  // #endregion
}
