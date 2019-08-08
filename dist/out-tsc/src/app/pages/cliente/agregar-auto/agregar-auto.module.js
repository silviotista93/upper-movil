import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AgregarAutoPage } from './agregar-auto.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
var routes = [
    {
        path: '',
        component: AgregarAutoPage
    }
];
var AgregarAutoPageModule = /** @class */ (function () {
    function AgregarAutoPageModule() {
    }
    AgregarAutoPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                PipesModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AgregarAutoPage]
        })
    ], AgregarAutoPageModule);
    return AgregarAutoPageModule;
}());
export { AgregarAutoPageModule };
//# sourceMappingURL=agregar-auto.module.js.map