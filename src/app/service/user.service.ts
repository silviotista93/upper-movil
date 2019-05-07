import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';


const URL = environment.url;
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
});

@Injectable({
  providedIn: 'root'
})

export class UserService {

  token: string = null;
  public usuario: Usuario = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController) { }


  // #region LOGIN
  login(email: string, password: string) {
    const data = { email, password };

    return new Promise(resolve => {

      this.http.post(`${URL}/api/auth/login`, data, { headers: headers })
        .subscribe(async resp => {
          console.log(resp);
          if (resp['access_token']) {
            this.token = resp['token_type'] + ' ' + resp['access_token'];
            await this.saveToken(this.token);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        }, err => {
          this.token = null;
          this.storage.clear();
          resolve(false);
        });
    });

  }
  //#endregion

  // #region LOGIN DE FACEBOOK
  loginFacebook(usuario: Usuario) {
    return new Promise(resolve => {
      this.http.post(`${URL}/api/auth/login-facebook`, usuario, { headers: headers })
        .subscribe(async resp => {
          console.log(resp);
          if (resp['access_token']) {
            this.token = resp['token_type'] + ' ' + resp['access_token'];
            await this.saveToken(this.token);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        }, err => {
          this.token = null;
          this.storage.clear();
          resolve(false);
        });
    });
  }
  // #endregion

  // #region LOGOUT
  logout() {
    this.token = null;
    this.usuario = null;
    this.storage.clear();
    console.log('limpio el storage');
    this.navCtrl.navigateRoot('login', { animated: true });
  }
  // #endregion

  // #region REGISTRO DE USUARIO
  registro(usuario: Usuario) {

    return new Promise(resolve => {
      this.http.post(`${URL}/api/auth/signup`, usuario, { headers: headers })
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
  // #endregion

  // #region OBTENER USUARIO
  async getUsuario() {
    if (!this.usuario) {
      await this.validaToken();
      console.log('id usuario ', this.usuario);
    }
    return { ...this.usuario };
  }
  // #endregion

  // #region GUARDAR TOKEN
  async  saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);

  }
  // #endregion

  // #region CARGAR TOKEN
  async loadToken() {
    return this.token = await this.storage.get('token') || null;
  }
  // #endregion

  // #region VALIDAR TOKEN
  async validaToken(): Promise<boolean> {

    await this.loadToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    return new Promise<boolean>(resolve => {

      const headerToken = new HttpHeaders({
        'Authorization': this.token,
      });

      this.http.get(`${URL}/api/auth/user/`, { headers: headerToken })
        .subscribe(resp => {
          console.log('respuesta antes de validar token ');
          if (resp['user']) {
            console.log('respuesta de validar token ', resp);
            this.usuario = resp['user'];
            console.log('este es el usuario ', this.usuario);
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }
        });
    });
  }
  // #endregion
}
