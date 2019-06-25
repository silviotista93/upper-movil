import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPaymentPage } from './modal-payment.page';
import { ModalInfoPlanPage } from '../modal-info-plan/modal-info-plan.page';
import { ModalInfoPlanPageModule } from '../modal-info-plan/modal-info-plan.module';

@NgModule({
  entryComponents: [
    ModalInfoPlanPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfoPlanPageModule
  ],
  declarations: [ModalPaymentPage]
})
export class ModalPaymentPageModule {}
