import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HistorialPage } from './historial.page';
var routes = [
    {
        path: '',
        component: HistorialPage
    }
];
var HistorialPageModule = /** @class */ (function () {
    function HistorialPageModule() {
    }
    HistorialPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [HistorialPage]
        })
    ], HistorialPageModule);
    return HistorialPageModule;
}());
export { HistorialPageModule };
//# sourceMappingURL=historial.module.js.map