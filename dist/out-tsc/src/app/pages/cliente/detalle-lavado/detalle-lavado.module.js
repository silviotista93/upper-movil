import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DetalleLavadoPage } from './detalle-lavado.page';
var routes = [
    {
        path: '',
        component: DetalleLavadoPage
    }
];
var DetalleLavadoPageModule = /** @class */ (function () {
    function DetalleLavadoPageModule() {
    }
    DetalleLavadoPageModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [
            // ImageModalPage
            ],
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                // ImageModalPageModule,
                RouterModule.forChild(routes)
            ],
            // providers: [NavParams],
            declarations: [DetalleLavadoPage]
        })
    ], DetalleLavadoPageModule);
    return DetalleLavadoPageModule;
}());
export { DetalleLavadoPageModule };
//# sourceMappingURL=detalle-lavado.module.js.map