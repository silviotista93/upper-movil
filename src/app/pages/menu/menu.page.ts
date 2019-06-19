import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/service/cliente/user.service';
import { Usuario } from 'src/app/interfaces/interfaces';
import { NavController, MenuController } from '@ionic/angular';
import { Router, RouterEvent } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  image: string;
  usuario: Usuario = {};
  URL = environment.url;
  pages = [];
  selectedPath = '';

  constructor(
     private router: Router,
     private userService: UserService,
     private menu: MenuController,
     private navCtrl: NavController) {
    this.router.events.subscribe((event: RouterEvent) => {
      // this.selectedPath = event.url;
    });
  }

   ngOnInit ()  {
    setTimeout(async()  => {
      this.usuario = await this.userService.getUsuario();
      this.image = this.usuario.avatar;
      console.log('avatar', this.usuario.avatar);
    }, 500);

    this.pages = [
      { title: 'Solicitar Servicio', url: '/menu/home', icon: 'home'},
      { title: 'Suscripciones', url: '/menu/subscripcion', icon: 'subscripcion'},
      { title: 'Historial', url: '/menu/historial', icon: 'historial'},
      { title: 'Mis Autos', url: '/menu/autos', icon: 'autos'},
      { title: 'Contacto', url: '/menu/contacto', icon: 'contacto'},
    ];

  }
  pushPerfil() {
    this.navCtrl.navigateForward('/menu/cuenta');
  }
}
