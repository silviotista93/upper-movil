import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalConfirmarSolicitudPage } from './modal-confirmar-solicitud.page';
import { ModalSolicitarPage } from '../modal-solicitar/modal-solicitar.page';
var ModalConfirmarSolicitudPageModule = /** @class */ (function () {
    function ModalConfirmarSolicitudPageModule() {
    }
    ModalConfirmarSolicitudPageModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [
                ModalSolicitarPage,
            ],
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
            ],
            exports: [
                ModalConfirmarSolicitudPage
            ],
            declarations: [ModalConfirmarSolicitudPage]
        })
    ], ModalConfirmarSolicitudPageModule);
    return ModalConfirmarSolicitudPageModule;
}());
export { ModalConfirmarSolicitudPageModule };
//# sourceMappingURL=modal-confirmar-solicitud.module.js.map