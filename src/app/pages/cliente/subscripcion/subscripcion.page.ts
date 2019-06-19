import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../../interfaces/interfaces';
import { UserService } from '../../../service/cliente/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-subscripcion',
  templateUrl: './subscripcion.page.html',
  styleUrls: ['./subscripcion.page.scss'],
})
export class SubscripcionPage implements OnInit {

  usuario: Usuario = {};
  constructor(
    private userService: UserService,
    private navCtrl: NavController
    ) { }

  async ngOnInit() {
    this.usuario = await this.userService.getUsuario();
    console.log(this.usuario);
  }

  abrirListSubscripciones() {
    this.navCtrl.navigateForward('/menu/list-subscripciones');
  }

}
