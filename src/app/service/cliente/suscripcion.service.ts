import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { environment } from '../../../environments/environment';
import { Plan } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {

  URL = environment.url;
  public plan: Plan = null;
  constructor(
    private http:HttpClient,
    private userService: UserService,

  ) { }
    // #region OBTENER PLANES
  getPlans() {
    const headerToken = new HttpHeaders({
      'Authorization': this.userService.token,
    });
    return this.http.get(`${this.URL}/api/plans/plans-all`, { headers: headerToken });
  }
  firstPlans(id: any){
    const headerToken = new HttpHeaders({
      'Authorization': this.userService.token,
    });
    return this.http.get(`${this.URL}/api/plans/plans-first/${id}`, { headers: headerToken });
  }

   firstPlans2(id: any) {
    const headerToken = new HttpHeaders({
    'Content-Type': 'application/json',
      'Authorization': this.userService.token,
    });
    return new Promise((resolve, reject) => {
     this.http.get(`${this.URL}/api/plans/plans-first/${id}`, { headers: headerToken })
        .subscribe(async resp => {
          this.plan = resp['plan'];
          resolve(this.plan);
          console.log(this.plan);
        }, err => {
          reject(err);
        });
      });
   }
   getSuscriptionsClient() {
    const headerToken = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': this.userService.token,
    });
    return new Promise((resolve, reject) => {
      this.http.get(`${this.URL}/api/suscripciones/suscripciones`, { headers: headerToken })
         .subscribe(async resp => {
          resolve(resp['suscripciones']);
         }, err => {
           reject(err);
         });
       });
  }
}
