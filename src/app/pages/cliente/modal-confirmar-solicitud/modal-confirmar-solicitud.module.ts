import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalConfirmarSolicitudPage } from './modal-confirmar-solicitud.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ModalConfirmarSolicitudPage]
})
export class ModalConfirmarSolicitudPageModule {}
