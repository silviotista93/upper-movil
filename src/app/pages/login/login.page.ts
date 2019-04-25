import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController, MenuController, LoadingController } from '@ionic/angular';
import { UserService } from '../../service/user.service';
import { UiServiceService } from '../../service/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrincipal') slides: IonSlides;
  userData: any;
  loginUser = {
    email: '',
    password: ''
  };
  registerUser: Usuario = {
    email: 'didier@gmail.com',
    name: 'Didier',
    last_name: 'Ramirez',
    phone_1: '3123121231',
  };

  constructor(
    private facebook: Facebook,
    private userService: UserService,
    private navCtrl: NavController,
    private menu: MenuController,
    private uiService: UiServiceService,
    private loadCtrl: LoadingController) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
    this.menu.enable(false);
  }

  loginWithFB() {
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = {
          driver: profile['driver'],
          id: profile['id'],
          email: profile['email'],
          first_name: profile['first_name'],
          picture: profile['picture_large']['data']['url'],
          username: profile['name']};
          console.log(this.userData);
      });
    });
  }


  // LOGICA DE FORMULARIO LOGIN
  async login(fLogin: NgForm) {
    console.log(fLogin.valid);

    // CREACION DEL LOADING
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();

    if (fLogin.invalid) { return; }
    const validated = await this.userService.login(this.loginUser.email, this.loginUser.password);

    if (validated) {
      //  NAVEGA A LA PAGINA PRINCIPAL
      loading.dismiss();
      this.navCtrl.navigateRoot('home', { animated: true });
    } else {
      //  MUESTRA ALERTA DE ERROR EN INICIO DE SESION
      loading.dismiss();
      console.log('no hay acceso');
      //this.uiService.alertInfo('Usuario y contraseña incorrectas.');
      this.uiService.presentToast('Usuario y contraseña incorrectas');
    }
  }

  // LOGICA DEL FORMULARIO DE REGISTRO
  async registro(fRegistro: NgForm) {
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();

    if (fRegistro.invalid) { return; }
    const validated = await this.userService.registro(this.registerUser);

    if (validated) {
      loading.dismiss();
      this.uiService.presentToast('Hemos enviado a tu correo constraseña de acceso');
      this.mostrarLogin();
    } else {
      loading.dismiss();
      this.uiService.presentToast('Correo ya esta en uso');
    }
  }


  // EVENTO DE BOTON REGISTRAR
  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
  // EVENTO DE BOTON LOGIN
  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

}
