import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubscripcionPage } from './subscripcion.page';
import { ModalPaymentPage } from '../modal-payment/modal-payment.page';
import { ModalPaymentPageModule } from '../modal-payment/modal-payment.module';

const routes: Routes = [
  {
    path: '',
    component: SubscripcionPage
  }
];

@NgModule({
  entryComponents: [
    ModalPaymentPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPaymentPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubscripcionPage]
})
export class SubscripcionPageModule {}
