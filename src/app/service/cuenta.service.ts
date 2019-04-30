import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  URL = environment.url;

 headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': this.userService.token
  });


  constructor(
    private userService: UserService,
    private http: HttpClient
    ) { }

  updatePassword ( password: string, password_confirmation: string, id: string ) {
    const data = { password, password_confirmation, id };
    console.log(this.userService.token);
      return new Promise( resolve => {
        console.log(data);
          this.http.post(`${this.URL}/api/auth/update-password`, data, { headers: this.headers })
          .subscribe( async resp => {
            if (resp['message']) {
              resolve(true);
              console.log('ok');
            } else {
              resolve(false);
              console.log(resp['error']);
            }
          }, err => {
            resolve(false);
          });
      });
  }
}
