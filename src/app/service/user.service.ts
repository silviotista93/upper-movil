import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { async } from 'q';



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
  constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController) { }
  private usuario: Usuario = {};

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

  loginFacebook(usuario: Usuario) {
    return new Promise(resolve => {
      this.http.post(`${URL}/api/auth/login-facebook`, usuario, { headers: headers })
      .subscribe( async resp => {
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

  logout() {
    this.token = null;
    this.usuario = null;
    this.storage.clear();
    console.log('limpio el storage');
    this.navCtrl.navigateRoot('login', { animated: true });
  }


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

  getUsuario () {
    if ( !this.usuario.id ) {
      this.validaToken();
    }
    return { ...this.usuario };
  }

  async  saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);

    await this.validaToken();
  }

  async loadToken () {
    this.token = await this.storage.get('token') || null;
  }

  async validaToken (): Promise<boolean> {

      await this.loadToken();
      if ( !this.token) {
        this.navCtrl.navigateRoot('login');
        return Promise.resolve(false);
      }
    const headerToken = new HttpHeaders({
      'Authorization': this.token,
    });
    return new Promise<boolean>( resolve => {
      this.http.get( `${URL}/api/auth/user`, { headers: headerToken })
      .subscribe (resp => {
        if (resp['user']) {
          console.log(' didiera ramirez', resp);
            this.usuario = resp['user'];
            resolve(true);
        } else {
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      });
    });
  }
}
