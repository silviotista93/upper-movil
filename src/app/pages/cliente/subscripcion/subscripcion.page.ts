import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../../interfaces/interfaces';
import { UserService } from '../../../service/cliente/user.service';

@Component({
  selector: 'app-subscripcion',
  templateUrl: './subscripcion.page.html',
  styleUrls: ['./subscripcion.page.scss'],
})
export class SubscripcionPage implements OnInit {

  usuario: Usuario = {};
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.usuario = this.userService.getUsuario();
    console.log(this.usuario);
  }

}
