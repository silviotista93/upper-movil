import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
var ModalAlertPlanAutoPage = /** @class */ (function () {
    function ModalAlertPlanAutoPage(navCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
    }
    ModalAlertPlanAutoPage.prototype.ngOnInit = function () {
    };
    ModalAlertPlanAutoPage.prototype.abrirAgregarAuto = function () {
        this.navCtrl.navigateForward('/menu/agregar-auto');
        this.modalCtrl.dismiss();
    };
    ModalAlertPlanAutoPage.prototype.cerrar_modal = function () {
        this.modalCtrl.dismiss();
    };
    ModalAlertPlanAutoPage = tslib_1.__decorate([
        Component({
            selector: 'app-modal-alert-plan-auto',
            templateUrl: './modal-alert-plan-auto.page.html',
            styleUrls: ['./modal-alert-plan-auto.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            ModalController])
    ], ModalAlertPlanAutoPage);
    return ModalAlertPlanAutoPage;
}());
export { ModalAlertPlanAutoPage };
//# sourceMappingURL=modal-alert-plan-auto.page.js.map