import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AutosPage } from './autos.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
var routes = [
    {
        path: '',
        component: AutosPage
    }
];
var AutosPageModule = /** @class */ (function () {
    function AutosPageModule() {
    }
    AutosPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                PipesModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AutosPage]
        })
    ], AutosPageModule);
    return AutosPageModule;
}());
export { AutosPageModule };
//# sourceMappingURL=autos.module.js.map