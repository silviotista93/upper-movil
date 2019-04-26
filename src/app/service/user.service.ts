import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { Usuario } from '../interfaces/interfaces';



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
  constructor(private http: HttpClient, private storage: Storage) { }
  private usuario: Usuario = {};

  login(email: string, password: string) {
    const data = { email, password };

    return new Promise(resolve => {

      this.http.post(`${URL}/api/auth/login`, data, { headers: headers })
        .subscribe(resp => {
          console.log(resp);
          if (resp['access_token']) {
            const token = resp['token_type'] + ' ' + resp['access_token'];
            this.saveToken(token);
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
      .subscribe(resp => {
        console.log(resp);
        if (resp['access_token']) {
          const token = resp['token_type'] + ' ' + resp['access_token'];
          this.saveToken(token);
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

  registro(usuario: Usuario) {

    return new Promise(resolve => {
      this.http.post(`${URL}/api/auth/signup`, usuario, { headers: headers })
        .subscribe(resp => {
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
    return { ...this.usuario };
  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }
}
