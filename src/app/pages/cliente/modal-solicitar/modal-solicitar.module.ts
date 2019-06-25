import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ModalSolicitarPage } from './modal-solicitar.page';
import { ModalConfirmarSolicitudPage } from '../modal-confirmar-solicitud/modal-confirmar-solicitud.page';
import { ModalConfirmarSolicitudPageModule } from '../modal-confirmar-solicitud/modal-confirmar-solicitud.module';


@NgModule({
  entryComponents: [
    ModalConfirmarSolicitudPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalConfirmarSolicitudPageModule
  ],
  declarations: [ModalSolicitarPage]
})
export class ModalSolicitarPageModule {}
