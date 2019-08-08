import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalPaymentPage } from './modal-payment.page';
import { ModalInfoPlanPage } from '../modal-info-plan/modal-info-plan.page';
import { ModalInfoPlanPageModule } from '../modal-info-plan/modal-info-plan.module';
import { ModalAlertPlanAutoPage } from '../modal-alert-plan-auto/modal-alert-plan-auto.page';
import { ModalAlertPlanAutoPageModule } from '../modal-alert-plan-auto/modal-alert-plan-auto.module';
var ModalPaymentPageModule = /** @class */ (function () {
    function ModalPaymentPageModule() {
    }
    ModalPaymentPageModule = tslib_1.__decorate([
        NgModule({
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
    ], ModalPaymentPageModule);
    return ModalPaymentPageModule;
}());
export { ModalPaymentPageModule };
//# sourceMappingURL=modal-payment.module.js.map