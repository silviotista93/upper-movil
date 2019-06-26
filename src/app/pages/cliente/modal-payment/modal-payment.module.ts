import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPaymentPage } from './modal-payment.page';
import { ModalInfoPlanPage } from '../modal-info-plan/modal-info-plan.page';
import { ModalInfoPlanPageModule } from '../modal-info-plan/modal-info-plan.module';
import { ModalAlertPlanAutoPage } from '../modal-alert-plan-auto/modal-alert-plan-auto.page';
import { ModalAlertPlanAutoPageModule } from '../modal-alert-plan-auto/modal-alert-plan-auto.module';

@NgModule({
  entryComponents: [
    ModalInfoPlanPage,
    ModalAlertPlanAutoPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfoPlanPageModule,
    ModalAlertPlanAutoPageModule
  ],
  declarations: [ModalPaymentPage]
})
export class ModalPaymentPageModule {}
