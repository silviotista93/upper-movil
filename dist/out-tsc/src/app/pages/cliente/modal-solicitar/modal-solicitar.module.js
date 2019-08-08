import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalSolicitarPage } from './modal-solicitar.page';
import { ModalConfirmarSolicitudPage } from '../modal-confirmar-solicitud/modal-confirmar-solicitud.page';
import { ModalConfirmarSolicitudPageModule } from '../modal-confirmar-solicitud/modal-confirmar-solicitud.module';
var ModalSolicitarPageModule = /** @class */ (function () {
    function ModalSolicitarPageModule() {
    }
    ModalSolicitarPageModule = tslib_1.__decorate([
        NgModule({
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
    ], ModalSolicitarPageModule);
    return ModalSolicitarPageModule;
}());
export { ModalSolicitarPageModule };
//# sourceMappingURL=modal-solicitar.module.js.map