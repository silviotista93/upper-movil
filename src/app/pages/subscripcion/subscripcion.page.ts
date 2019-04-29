import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Usuario } from '../../interfaces/interfaces';

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
