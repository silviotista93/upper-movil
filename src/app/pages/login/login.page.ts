import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrincipal') slides: IonSlides;

  loginUser = {
    email: 'watson.paucek@example.com',
    password: 'secret'
  };
  constructor( private userService: UserService, private navCtrl: NavController ) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login( fLogin: NgForm ) {
    console.log(fLogin.valid);
    console.log(this.loginUser);

    if ( fLogin.invalid ) { return; }
   const validated = await this.userService.login(this.loginUser.email, this.loginUser.password );

   if ( validated ) {
    this.navCtrl.navigateRoot('home', { animated: true});
   } else {
    console.log('no hay acceso');
   }
  }

  registro( fRegistro: NgForm ) {
    console.log(fRegistro.valid);
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

}
