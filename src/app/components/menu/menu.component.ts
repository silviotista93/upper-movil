import { Component, OnInit } from '@angular/core';
import { NavController, Events } from '@ionic/angular';
import { ComponentMenu, Usuario, RolesUsers } from 'src/app/interfaces/interfaces';
import { UiServiceService } from '../../service/ui-service.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/service/cliente/user.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';
import { NgZone } from '@angular/core';
import { UserGuard } from 'src/app/guards/user.guard';

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
  rolesUsuario: RolesUsers = {};
  tokenService = null;

  constructor(
    public events: Events,
    private navCtrl: NavController,
    private uiServ: UiServiceService,
    private http: HttpClient,
    private storage: Storage,
    private zone: NgZone,
    private userService: UserService) {
    this.events.subscribe('updateScreen', () => {
      this.zone.run(() => {
        console.log('force update the screen');
      });
    });
  }

  pushPerfil() {
    this.navCtrl.navigateForward('/cuenta');
  }

  ngOnInit() {
    // this.usuario = this.userService.getUsuario();
    // console.log('usuario menu', this.usuario);
     this.componentMenu = this.uiServ.getMenuOptions();
     this.storage.get('token').then(async res => {
       console.log(res);
       this.tokenService = res;
       const headerToken = new HttpHeaders({
         'Authorization': this.tokenService,
       });
       this.http.get(`${this.URL}/api/auth/user`, { headers: headerToken })
         .subscribe(resp => {
           this.usuario = resp['user'];
           return this.usuario;
         });
       return this.tokenService;
     });

     this.storage.get('token').then(async res => {
      this.tokenService = res;
      const headerToken = new HttpHeaders({
        'Authorization': this.tokenService,
      });
      this.http.get(`${this.URL}/api/auth/user-roles`, { headers: headerToken})
        .subscribe(resp => {
          console.log(resp);
          this.rolesUsuario = resp['roles'];
          console.log('id rol', this.rolesUsuario.id);
          return this.rolesUsuario;
        });
      return this.tokenService;
    });

  }


}
