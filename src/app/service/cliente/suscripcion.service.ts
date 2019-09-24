import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { environment } from '../../../environments/environment';
import { Plan, CreateSuscription, CarSuscription, CarDetailSuscription } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {

  URL = environment.url;
  public plan: Plan = null;
  createPlan: CreateSuscription = null;
  constructor(
    private http: HttpClient,
    private userService: UserService) { }

  // ------------------
  public carSuscriptions: CarSuscription[] = [];
  public carDetailSus: CarDetailSuscription;
  public plans: Plan[] = [];
  id: any; 
  // ------------------

  //#region OBTENER PLANES
  getPlans() {
    const headerToken = new HttpHeaders({
      'Authorization': this.userService.token,
    });
    return this.http.get(`${this.URL}/api/plans/plans-all`, { headers: headerToken });
  }
  firstPlans(id: any) {
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
          // console.log('La respuetsa de mi tio jejeje', resp);
          
          // this.carSuscriptions = resp['suscripciones'];
          // console.log('listado', this.carSuscriptions);
          // // this.carSuscriptions.reverse();

          // this.carSuscriptions.forEach(element => {
          //   this.id++;
          //   this.id = element['plans']['name'];
          //   this.plans.push(element['plans']);
          //   // const id = element['suscripciones']['plans']['id'];
          //   // if (this.id) {
          //   //   this.plan.push(element['plans']);
          //   //   // if (this.plan[this.id]['id']) {
          //   //   // }
          //   // }
          // });
          // console.log('element', this.plans);
          // console.log('La respuetsa de mi tio jejeje', this.carSuscriptions);
          // resolve(this.carSuscriptions);
          resolve(resp['suscripciones']);
        }, err => {
          reject(err);
        });
    });
  }

  // #region OBTENER USUARIO
  async getSuscriptions() {
    if (!this.carSuscriptions) {
      this.getSuscriptionsClient();
    }
    this.getSuscriptionsClient();
    return  this.carSuscriptions ;
  }
  // #endregion

  //#region primer plan
  firstPlan(id: any) {
    const headerToken = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.userService.token,
    });
    return new Promise((resolve, reject) => {
      this.http.get(`${this.URL}/api/payment/plan-suscription/${id}`, { headers: headerToken })
        .subscribe(async resp => {
          resolve(resp);
          console.log(resp['plan'])
        }, err => {
          reject(err);
        });
    });
  }
  //#endregion

  //#region REGISTRO DE USUARIO
  registroSuscripcion(createPlan: CreateSuscription) {
    const headerToken = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.userService.token,
    });
    return new Promise(resolve => {
      this.http.post(`${this.URL}/api/suscripciones/agregar-suscripcion`, createPlan, { headers: headerToken })
        .subscribe(async resp => {
          if (!resp['ERROR']) {
            resolve(true);
            console.log('resp ', resp);
          } else {
            resolve(false);
          }
        }, err => {

          console.log('error ', err);
          resolve(false);
        });
    });
  }
  // #endregion
}
