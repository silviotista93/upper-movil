import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Order, Car, CarSuscription } from '../../interfaces/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UiServiceService } from '../ui-service.service';
import { UserService } from './user.service';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
});

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  URL = environment.url;
  token: string = null;
  image: string;

  public order: Order = {};
  public order2: Order = {};
  public car_suscription2: CarSuscription = {};
  public car: Car = {};

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private uiService: UiServiceService
  ) { }

  //#region Validar token 
  // validateToken() {
  //   this.token = this.userService.token;

  //   return new Promise(resolve => {
  //     const headerToken = new HttpHeaders({
  //       'Authorization': this.userService.token,
  //     });
  //     this.http.get(`${this.URL}/api/car/cars`, { headers: headerToken })
  //       .subscribe(resp => {
  //         if (resp['cars']) {
  //           console.log('Car valida token ', resp);
  //           this.order = resp['cars'];
  //           console.log('estos son los carros ', this.order);
  //           resolve(true);
  //         } else {
  //           // this.navCtrl.navigateRoot('/login');
  //           console.log('else de la promesa');
  //           resolve(false);
  //         }
  //       });
  //   });
  // }
  //#endregion

  getOrden() {
    const headerToken = new HttpHeaders({
      'Authorization': this.userService.token,
      'Content-Type': 'application/json',
    });
    // return this.http.get(`${this.URL}/api/order/index-client-order`, { headers: headerToken });
    return new Promise((resolve, reject) => {
      this.http.get(`${this.URL}/api/order/index-client-order`, { headers: headerToken })
        .subscribe(async resp => {
          resolve(resp['orders']);
        }, err => {
          reject(err);
        });
    });
  };

  createOrder(order: Order) {
    const headerToken = new HttpHeaders({
      'Authorization': this.userService.token,
      'Content-Type': 'application/json',
    });
    return new Promise(resolve => {
      this.http.post(`${this.URL}/api/order/create-order`, order, { headers: headerToken })
        .subscribe(async resp => {
          if (resp['order']) {
            console.log('ok, realizado', resp);
            resolve(true);
          } else {
            resolve(false);
          }
        }, err => {
          console.log('err', err);
          resolve(false);
        });
    });
  }

  async getCarSuscriptionOrden(id: any) {
    const headerToken = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.userService.token,
    });
    return await this.http.get(`${this.URL}/api/order/detail-car-suscription/${id}`, { headers: headerToken })
      .subscribe(async resp => {
        this.car_suscription2 = resp['car_suscription'];
        console.log('car sus desde el servicio', this.car_suscription2)
        this.car = this.car_suscription2['car'];
        return this.car;
      }, err => {
      });
  }

  getDetailOrden(id: any) {
    const headerToken = new HttpHeaders({
      'Authorization': this.userService.token,
      'Content-Type': 'application/json',
    });

    return new Promise((resolve, reject) => {
      this.http.get(`${this.URL}/api/order/detail-orden/${id}`, { headers: headerToken })
        .subscribe(resp => {
          resolve(resp['detail-order'])
          console.log(resp);
        }, err => {

        });
    });

  }


}
