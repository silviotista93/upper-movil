import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController, MenuController, LoadingController } from '@ionic/angular';
import { UserService } from '../../service/user.service';
import { UiServiceService } from '../../service/ui-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrincipal') slides: IonSlides;

  loginUser = {
    email: 'rowe.dulce@example.org',
    password: 'secret'
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
      this.uiService.alertInfo('Usuario y contraseña incorrectas.');
    }
  }

  // LOGICA DEL FORMULARIO DE REGISTRO
  registro(fRegistro: NgForm) {
    console.log(fRegistro.valid);
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
