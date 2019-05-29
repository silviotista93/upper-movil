import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Order } from '../../interfaces/interfaces';
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

  public order: Order = {};

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private uiService: UiServiceService
  ) { }

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
            this.order = resp['cars'];
            console.log('estos son los carros ', this.order);
            resolve(true);
          } else {
            // this.navCtrl.navigateRoot('/login');
            console.log('else de la promesa');
            resolve(false);
          }
        });
    });
  }

  getOrden() {
    const headerToken = new HttpHeaders({
      'Authorization': this.userService.token,
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.URL}/api/order/index-client-order`, { headers: headerToken });
  }

  createOrder(order: Order) {
    const headerToken = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': this.userService.token,
    });
    return new Promise(resolve => {
      this.http.post(`${this.URL}/api/order/create-order`, order, { headers: headerToken })
        .subscribe(async resp => {
          if (!resp['ERROR']) {
            console.log('ok, realizado');
            resolve(true);
          } else {
            resolve(false);
          }
        }, err => {

          resolve(false);
        });
    });
  }

}
