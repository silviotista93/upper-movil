import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Usuario } from '../../interfaces/interfaces';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

   URL = environment.url;

  
  usuario: Usuario = {};
  constructor( private userService: UserService) { }
  
  ngOnInit() {
    
    this.usuario = this.userService.getUsuario();
    console.log('Este es el usuario malo'+this.usuario);
  }

}
