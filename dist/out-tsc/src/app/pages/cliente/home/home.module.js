import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { ModalSolicitarPage } from '../modal-solicitar/modal-solicitar.page';
import { ModalSolicitarPageModule } from '../modal-solicitar/modal-solicitar.module';
import { ModalAlertAgregarAutoPage } from '../modal-alert-agregar-auto/modal-alert-agregar-auto.page';
import { ModalAlertAgregarAutoPageModule } from '../modal-alert-agregar-auto/modal-alert-agregar-auto.module';
var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [
                ModalSolicitarPage,
                ModalAlertAgregarAutoPage
            ],
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                ModalSolicitarPageModule,
                ModalAlertAgregarAutoPageModule,
                RouterModule.forChild([
                    {
                        path: '',
                        component: HomePage
                    }
                ])
            ],
            declarations: [HomePage]
        })
    ], HomePageModule);
    return HomePageModule;
}());
export { HomePageModule };
//# sourceMappingURL=home.module.js.map