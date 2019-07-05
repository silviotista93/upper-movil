import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { UiServiceService } from '../ui-service.service';


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
  roles: any;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController,
    private uiService: UiServiceService) { }


  // #region LOGIN
  login(email: string, password: string) {
    const data = { email, password };

    return new Promise(resolve => {

      this.http.post(`${URL}/api/auth/login`, data, { headers: headers })
        .subscribe(async resp => {
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
    console.log('ESTAMOS EN LA FUNCION DE LARAVEL', usuario);
    return new Promise(resolve => {
      this.http.post(`${URL}/api/auth/login-facebook`, usuario, { headers: headers })
        .subscribe( resp => {
          console.log('respuesta', JSON.stringify(resp));
          if (resp['access_token']) {
            this.token = resp['token_type'] + ' ' + resp['access_token'];
            this.saveToken(this.token);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        }, err => {
          console.log('err', JSON.stringify(err));
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

  // #region RESTABLECER CONTRASEÑA
  forgotPassword(email: any) {
    return new Promise(resolve => {
      this.http.post(`${URL}/api/auth/forgot-password`, email, { headers: headers })
        .subscribe(async resp => {
          if (resp['success']) {
            resolve(true);
          } else {
            this.uiService.errorToast('Correo electrónico no existe');
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
      this.validaToken();
    }
    this.validaToken();
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
          this.roles = resp['user']['roles'];
          const rol = this.roles[0].id;
          const status = resp['user']['state'];
          if (rol === 3) {
            if (status === '1') {
              this.usuario = resp['user'];
              resolve(true);
            } else {
              this.uiService.alertInfo2('Usuario se encuentra inactivo');
              resolve(false);
            }
          } else {
            this.uiService.errorToast('No tienes pemisos para iniciar');
            this.logout();
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }
        });
    });
  }
  // #endregion
}
