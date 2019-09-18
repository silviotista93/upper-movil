import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/cliente/user.service';
import { Usuario } from '../../../interfaces/interfaces';
import { environment } from '../../../../environments/environment';
import { NgForm } from '@angular/forms';
import { LoadingController, NavController, ActionSheetController } from '@ionic/angular';
import { UiServiceService } from '../../../service/ui-service.service';
import { CuentaService } from '../../../service/cliente/cuenta.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImageSanitizerPipe } from '../../../pipes/image-sanitizer.pipe';


declare var window: any;

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  URL = environment.url;
  private usuario: Usuario = {};


  constructor(
    private userService: UserService,
    private cuentaService: CuentaService,
    private loadCtrl: LoadingController,
    private navCtrl: NavController,
    private actSheetCtrl: ActionSheetController,
    private camera: Camera,
    private uiService: UiServiceService) { }

  dataPassword = {
    password: '',
    password_confirmation: '',
  };

  image: string;
  name: string ;
  lastname: string;
  
  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.usuario = await this.userService.getUsuario();
    this.image = this.usuario.avatar;
    this.name = this.usuario.names;
    this.lastname  = this.usuario.last_name;
    console.log('Este es un mensaje',environment.address)
  }

  logout() {
    this.userService.logout();
  }

  //#region ACTUALIZAR CONTRASEÑA
  async updatePassword(fPassword: NgForm) {
    // CREACION DEL LOADING
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();

    if (fPassword.invalid) {
      loading.dismiss();
      this.uiService.errorToast('Todos los campos son obligatorios');
      return;
    }
    const validated = await this.cuentaService.updatePassword(
      this.dataPassword.password, this.dataPassword.password_confirmation, this.usuario.id
    );
    if (validated) {
      this.dataPassword = {
        password: '',
        password_confirmation: ''
      };
      loading.dismiss();
    } else {
      this.dataPassword = {
        password: '',
        password_confirmation: ''
      };
      loading.dismiss();
    }
  }
  // #endregion

  //#region ACTUALIZAR PERFIL
  async updateProfile(fProfile: NgForm) {
    this.usuario.names = this.name;
    this.usuario.last_name = this.lastname;
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();
    if (fProfile.invalid) {
      loading.dismiss();
      this.uiService.errorToast('Todos los campos son obligatorios');
      return;
    }
    const validated = await this.cuentaService.updateProfile2(this.usuario);
    if (validated) {
      loading.dismiss();
      await this.ionViewWillEnter();
    } else {
      loading.dismiss();
    }
  }
  //#endregion

  // #region Abrir Camera
  async openCamera() {
    const optionsCamera: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 400,
      targetHeight: 400,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    }
    await this.getPicture(optionsCamera);
  }
  // #endregion

  // #region Abrir Galeria
  async openGallery() {
    const optionsGallery: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 400,
      targetHeight: 400,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    await this.getPicture(optionsGallery);
  }
  // #endregion

  // #region Obtener imagen
  getPicture(options: CameraOptions) {
    this.camera.getPicture(options).then(async (imageData) => {

      const img = window.Ionic.WebView.convertFileSrc(imageData);
      const loading = await this.loadCtrl.create({
        spinner: 'crescent',
      });
      await loading.present();

      this.image = img;
      const val = await this.cuentaService.updateAvatar(imageData);
      if (val) {
        loading.dismiss();
        this.ionViewWillEnter();
      }
      loading.dismiss();

    }, (err) => {
      // Handle error
    });
  }
  // #endregion

  // #region action sheet
  async presentActionSheet() {
    const actionSheet = await this.actSheetCtrl.create({
      header: 'Selecciona una opción',
      buttons: [
        {
          text: 'Camara',
          icon: 'camera',
          handler: () => {
            this.openCamera();
            console.log('Camara clicked');
          }
        }, {
          text: 'Galeria',
          icon: 'images',
          handler: () => {
            this.openGallery();
            console.log('Galeria clicked');
          }
        }]
    });
    await actionSheet.present();
  }
  // #endregion

}
