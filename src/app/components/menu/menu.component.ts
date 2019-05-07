import { Component, OnInit } from '@angular/core';
import { NavController, Events } from '@ionic/angular';
import { ComponentMenu, Usuario } from 'src/app/interfaces/interfaces';
import { UiServiceService } from '../../service/ui-service.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/service/user.service';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';
import { NgZone  } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  menuComp: ComponentMenu[];
  componentMenu: Observable<ComponentMenu[]>;

  URL = environment.url;
  usuario: Usuario = {};
  tokenService = null;

  constructor(
    public events: Events,
    private navCtrl: NavController,
    private uiServ: UiServiceService,
    private userService: UserService) { 
      this.usuario = this.userService.getUsuario(); }

  pushPerfil() {
    this.navCtrl.navigateForward('/cuenta');
  }

  ngOnInit() {
    this.componentMenu = this.uiServ.getMenuOptions();
    this.usuario = this.userService.getUsuario();
    console.log('usuario en menu',this.usuario);
  }

}
