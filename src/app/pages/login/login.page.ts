import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController, MenuController, LoadingController } from '@ionic/angular';
import { UserService } from '../../service/user.service';
import { UiServiceService } from '../../service/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrincipal') slides: IonSlides;

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
    private userService: UserService,
    private navCtrl: NavController,
    private menu: MenuController,
    private uiService: UiServiceService,
    private loadCtrl: LoadingController) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
    this.menu.enable(false);
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
    if ( fRegistro.invalid ) { return; }
   const validated = await this.userService.registro ( this.registerUser );

    if ( validated ) {
      this.mostrarLogin();
    } else {

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
