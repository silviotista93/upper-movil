import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
var ModalAlertAgregarAutoPage = /** @class */ (function () {
    function ModalAlertAgregarAutoPage(modalCtrl, navCtrl) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
    }
    ModalAlertAgregarAutoPage.prototype.ngOnInit = function () {
    };
    ModalAlertAgregarAutoPage.prototype.abrirAgregarAuto = function () {
        this.navCtrl.navigateForward('/menu/agregar-auto');
        this.modalCtrl.dismiss();
    };
    ModalAlertAgregarAutoPage.prototype.cerrar_modal = function () {
        this.modalCtrl.dismiss();
    };
    ModalAlertAgregarAutoPage = tslib_1.__decorate([
        Component({
            selector: 'app-modal-alert-agregar-auto',
            templateUrl: './modal-alert-agregar-auto.page.html',
            styleUrls: ['./modal-alert-agregar-auto.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController, NavController])
    ], ModalAlertAgregarAutoPage);
    return ModalAlertAgregarAutoPage;
}());
export { ModalAlertAgregarAutoPage };
//# sourceMappingURL=modal-alert-agregar-auto.page.js.map