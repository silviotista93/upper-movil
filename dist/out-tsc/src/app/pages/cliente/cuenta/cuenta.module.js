import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CuentaPage } from './cuenta.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
var routes = [
    {
        path: '',
        component: CuentaPage
    }
];
var CuentaPageModule = /** @class */ (function () {
    function CuentaPageModule() {
    }
    CuentaPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                PipesModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CuentaPage]
        })
    ], CuentaPageModule);
    return CuentaPageModule;
}());
export { CuentaPageModule };
//# sourceMappingURL=cuenta.module.js.map