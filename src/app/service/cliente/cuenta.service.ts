import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { UserService } from './user.service';
import { UiServiceService } from '../ui-service.service';
import { Usuario } from '../../interfaces/interfaces';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { CuentaPage } from '../../pages/cliente/cuenta/cuenta.page';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  //#region Variable y headers
  URL = environment.url;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': this.userService.token,
  });
  //#endregion

  image: any = "";

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private fileTransfer: FileTransfer,
    private navCtrl: NavController,
    private uiService: UiServiceService) { }

  // #region Actualizar contraseña
  updatePassword(password: string, password_confirmation: string, id: string) {
    const data = { password, password_confirmation, id };
    return new Promise(resolve => {
      this.http.post(`${this.URL}/api/profile/update-password`, data, { headers: this.headers })
        .subscribe(async resp => {
          if (resp['access_token']) {
            this.userService.token = resp['token_type'] + ' ' + resp['access_token'];
            await this.userService.saveToken(this.userService.token);
            this.navCtrl.navigateRoot('/menu/home', { animated: true });
            this.uiService.successToast(resp['message']);
            resolve(true);
          } 
        }, async err => {
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

  // #region Actualizar usuario
  updateProfile2(user: Usuario) {
    return new Promise(resolve => {
      this.http.post(`${this.URL}/api/profile/update`, user, { headers: this.headers })
        .subscribe(async resp => {
          if (resp['access_token']) {
            await this.userService.saveToken(resp['token_type'] + ' ' + resp['access_token']);
            await this.userService.validaToken();
            this.uiService.successToast(resp['message']);
            // window.location.reload();
            resolve(true);
          } 
        }, async err => {
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

  // #region Actulizar Foto
  updateAvatar(img: string) {
    const options: FileUploadOptions = {
      fileKey: 'avatar',
      headers: { 'Authorization': this.userService.token }
    }

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    return new Promise(resolve => {
      fileTransfer.upload(img, `${this.URL}/api/profile/update-avatar`, options)
        .then(async (data) => {
          this.image = await data.response;
          this.userService.usuario.avatar = this.image;
          this.uiService.successToast('¡Imagen actualizada!');
          resolve(true);
        }).catch(err => {
          console.log('error', err)
        });
    })
  }
  // #endregion


}
