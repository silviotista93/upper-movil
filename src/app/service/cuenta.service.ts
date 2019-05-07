import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { UserService } from './user.service';
import { UiServiceService } from './ui-service.service';


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
    private http: HttpClient,
    private uiService: UiServiceService) { }

  // #region Actualizar contraseña
  updatePassword(password: string, password_confirmation: string, id: string) {
    const data = { password, password_confirmation, id };

    // console.log(this.userService.token);
    return new Promise(resolve => {
      console.log(data);
      this.http.post(`${this.URL}/api/auth/update-password`, data, { headers: this.headers })
        .subscribe(resp => {
          console.log('esta es la respuesta ', resp);

          if (resp['access_token']) {
            console.log(resp);
            this.userService.token = resp['token_type'] + ' ' + resp['access_token'];
            this.userService.saveToken(this.userService.token);
            this.uiService.successToast(resp['message']);
            resolve(true);

          } else if (resp['error']) {

            this.uiService.errorToast(resp['error']);

            console.log(resp);
            resolve(false);
          }

        }, async err => {
          console.log('esta es la respuesta error');
          console.log(err);

          if (err['error']["errors"]) {
            const errores = err['error']["errors"];
            let msgError = "";

            Object.keys(errores).map(error => {
              const detalle = errores[error][0];
              msgError += `${detalle}\n`;
            });

            if (msgError !== "") {
              this.uiService.errorToast(msgError);
            }
            resolve(true);
          }

          resolve(false);
        });
    });
  }
  // #endregion


}
