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

  createOrder(order: Order) {
    console.log('token', this.userService.token);

    return new Promise(resolve => {
      this.http.post(`${URL}/api/order/create-order`, order, { headers: headers })
        .subscribe(async resp => {
          if (!resp['ERROR']) {
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
