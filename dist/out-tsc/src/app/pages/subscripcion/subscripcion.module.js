import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SubscripcionPage } from './subscripcion.page';
var routes = [
    {
        path: '',
        component: SubscripcionPage
    }
];
var SubscripcionPageModule = /** @class */ (function () {
    function SubscripcionPageModule() {
    }
    SubscripcionPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SubscripcionPage]
        })
    ], SubscripcionPageModule);
    return SubscripcionPageModule;
}());
export { SubscripcionPageModule };
//# sourceMappingURL=subscripcion.module.js.map