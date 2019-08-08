import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ListSubscripcionesPage } from './list-subscripciones.page';
import { ModalInfoPlanPage } from '../modal-info-plan/modal-info-plan.page';
import { ModalInfoPlanPageModule } from '../modal-info-plan/modal-info-plan.module';
var routes = [
    {
        path: '',
        component: ListSubscripcionesPage
    }
];
var ListSubscripcionesPageModule = /** @class */ (function () {
    function ListSubscripcionesPageModule() {
    }
    ListSubscripcionesPageModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [
                ModalInfoPlanPage
            ],
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                ModalInfoPlanPageModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ListSubscripcionesPage]
        })
    ], ListSubscripcionesPageModule);
    return ListSubscripcionesPageModule;
}());
export { ListSubscripcionesPageModule };
//# sourceMappingURL=list-subscripciones.module.js.map