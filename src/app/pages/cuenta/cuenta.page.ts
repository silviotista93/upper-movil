import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Usuario } from '../../interfaces/interfaces';
import { environment } from '../../../environments/environment';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { UiServiceService } from '../../service/ui-service.service';
import { CuentaService } from '../../service/cuenta.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

   URL = environment.url;
  usuario: Usuario = {};
  constructor( private userService: UserService,
     private cuentaService: CuentaService,
     private loadCtrl: LoadingController,
     private uiService: UiServiceService) { }

     dataPassword = {
      password: '',
      password_confirmation: '',
    };

    datUser: Usuario = {
      id: '',
      email: '',
      name: '',
      last_name: '',
      phone_1: '',
      phone_2: '',
    };

  ngOnInit() {
    this.usuario = this.userService.getUsuario();
  }

  logout () {
    this.userService.logout();
  }

  async updatePassword( fPassword: NgForm ) {

    this.usuario = this.userService.getUsuario();
    console.log(this.usuario.id);
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();

    if (fPassword.invalid) {
      loading.dismiss();
      this.uiService.errorToast('Todos los campos son obligatorios');
      return;
    }
    const validated = await this.cuentaService.updatePassword(
      this.dataPassword.password, this.dataPassword.password_confirmation, this.usuario.id
      );
    if (validated) {
      loading.dismiss();
      this.uiService.successToast('Constraseña Actualizada');
    } else {
      loading.dismiss();
      this.uiService.errorToast('Error');
    }
  }

  async updateProfile( fProfile: NgForm ) {
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();
    if (fProfile.invalid) {
      loading.dismiss();
      this.uiService.errorToast('Todos los campos son obligatorios');
      return;
    }
    const validated = await this.cuentaService.updateProfile(this.datUser);
    console.log(this.usuario);
    if (validated) {
      loading.dismiss();
      this.uiService.successToast('Perfil Actualizado Actualizada');
    } else {
      loading.dismiss();
      this.uiService.errorToast('Error');
    }
  }
}
