import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController, MenuController, LoadingController } from '@ionic/angular';
import { UserService } from '../../service/cliente/user.service';
import { UiServiceService } from '../../service/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { HttpClient } from '@angular/common/http';
import { GooglePlus } from '@ionic-native/google-plus/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  user: any = {};
  userData: any = {};

  usuario: Usuario;
  loginUser = {
    email: '',
    password: ''
  };

  forgotPassword = {
    email: ''
  };

  registerUser: Usuario = {
    email: '',
    names: '',
    last_name: '',
    phone_1: '',
  };

  constructor(
    private facebook: Facebook,
    private userService: UserService,
    private navCtrl: NavController,
    private menu: MenuController,
    private uiService: UiServiceService,
    private httpClient: HttpClient,
    private google: GooglePlus,
    private loadCtrl: LoadingController) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
    this.menu.enable(false);
  }


  //#region LOGIN FACEBOOK FULL
  loginFb() {
    this.facebook.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        if (res.status === 'connected') {
          this.getData(res.authResponse.accessToken);
        } else {
          alert('Error al iniciar sesión');
        }
        console.log('Logged into Facebook!', res);
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  async getData(accessToken: string) {
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });

    const url = 'https://graph.facebook.com/me?fields=id,name,first_name,last_name,picture.width(720).height(720).as(picture_large),email&access_token=' + accessToken;
    this.httpClient.get(url).subscribe(data => {
      this.usuario = {
        id: data['id'],
        email: data['email'],
        avatar: data['picture_large']['data']['url'],
        names: data['first_name'],
        last_name: data['last_name'],
        account: 'facebook'
      };
      console.log(' user', this.usuario);
      const validated = this.userService.loginWithAccount(this.usuario);
      if (validated) {
        //   NAVEGA A LA PAGINA PRINCIPAL
        loading.dismiss();
        // this.navCtrl.navigateRoot('/menu/home', { animated: true });
      } else {
        //  MUESTRA ALERTA DE ERROR EN INICIO DE SESION
        this.facebook.logout().then(() => { }).catch(() => { });
        loading.dismiss();
      }
    });
  }
  // #endregion

  //#region LOGIN GOOGLE
  loginGoo() {

    console.log('click google');

    this.google.login({})
      .then(data => {
        console.log(data);

        this.usuario = {
          id: data['userId'],
          email: data['email'],
          avatar: data['imageUrl'],
          names: data['givenName'],
          last_name: data['familyName'],
          account: 'google'
        };
        const validated = this.userService.loginWithAccount(this.usuario);
        if (validated) {
          //   NAVEGA A LA PAGINA PRINCIPAL
          // loading.dismiss();
        console.log(this.usuario);
          // this.navCtrl.navigateRoot('/menu/home', { animated: true });
        } else {
          //  MUESTRA ALERTA DE ERROR EN INICIO DE SESION
          // loading.dismiss();
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
  // #endregion

  //#region LOGIN CON FACEBOOK
  // async loginWithFB() {
  // CREACION DEL LOADING
  //   const loading = await this.loadCtrl.create({
  //     spinner: 'crescent'
  //   });



  //   this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
  //     this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', ['public_profile', 'email'])
  //       .then(profile => {
  //         // Datos del Usuario
  //         this.usuario = {
  //           id: profile['id'],
  //           email: profile['email'],
  //           avatar: profile['picture_large']['data']['url'],
  //           names: profile['name'],
  //           last_name: profile['last_name']
  //         };
  //         console.log(this.usuario);
  //         const validated = this.userService.loginFacebook(this.usuario);
  //         console.log('AQUI ESTAMOS MAURICIO');
  //         if (validated) {
  //           //   NAVEGA A LA PAGINA PRINCIPAL
  //           loading.dismiss();
  //           this.navCtrl.navigateRoot('/menu/home', { animated: true });
  //           window.location.reload();
  //         } else {
  //           //  MUESTRA ALERTA DE ERROR EN INICIO DE SESION
  //         }
  //       });
  //   });
  // }
  //#endregion

  //#region LOGICA DE FORMULARIO LOGIN
  async login(fLogin: NgForm) {
    console.log(fLogin.valid);

    // CREACION DEL LOADING
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();

    if (fLogin.invalid) {
      loading.dismiss();
      this.uiService.errorToast('Todos los campos son obligatorios');
      return;
    }
    const validated = await this.userService.login(this.loginUser.email, this.loginUser.password);

    if (validated) {
      //  NAVEGA A LA PAGINA PRINCIPAL
      loading.dismiss();
      this.navCtrl.navigateRoot('/menu/home', { animated: true });
    } else {
      //  MUESTRA ALERTA DE ERROR EN INICIO DE SESION
      loading.dismiss();
      console.log('no hay acceso');
      this.uiService.errorToast('Usuario y contraseña incorrectas');
    }
  }
  //#endregion

  //#region LOGICA DEL FORMULARIO DE REGISTRO
  async registro(fRegistro: NgForm) {
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();

    if (fRegistro.invalid) {
      loading.dismiss();
      this.uiService.errorToast('Todos los campos son obligatorios');
      return;
    }
    const validated = await this.userService.registro(this.registerUser);
    console.log(this.registerUser);
    if (validated) {
      loading.dismiss();
      this.loginUser.email = this.registerUser.email;
      this.uiService.successToast('Hemos enviado a tu correo constraseña de acceso');
      this.mostrarLogin();
    } else {
      loading.dismiss();
      this.uiService.errorToast('Correo ya esta en uso');
    }
  }
  //#endregion

  //#region LOGICA PARA RECUPERAR CONTRASEÑA
  async restaPassword(fForPassword: NgForm) {
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();

    if (fForPassword.invalid) {
      loading.dismiss();
      this.uiService.errorToast('El campo email es obligatorio');
      return;
    }
    const validated = await this.userService.forgotPassword(this.forgotPassword);
    console.log(this.forgotPassword);
    if (validated) {
      loading.dismiss();
      this.loginUser.email = this.forgotPassword.email;
      this.uiService.successToast('Hemos enviado a tu correo constraseña de acceso');
      this.mostrarLogin();
    } else {
      loading.dismiss();
    }
  }
  //#endregion

  //#region EVENTO DE LOS BOTONES
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

  // EVENTO DE BOTON LOGIN
  mostrarRecuperarPassword() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(2);
    this.slides.lockSwipes(true);
  }
  // #endregion

}
