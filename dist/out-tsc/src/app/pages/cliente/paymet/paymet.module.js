import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PaymetPage } from './paymet.page';
var routes = [
    {
        path: '',
        component: PaymetPage
    }
];
var PaymetPageModule = /** @class */ (function () {
    function PaymetPageModule() {
    }
    PaymetPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [PaymetPage]
        })
    ], PaymetPageModule);
    return PaymetPageModule;
}());
export { PaymetPageModule };
//# sourceMappingURL=paymet.module.js.map