import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditarAutoPage } from './editar-auto.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
var routes = [
    {
        path: '',
        component: EditarAutoPage
    }
];
var EditarAutoPageModule = /** @class */ (function () {
    function EditarAutoPageModule() {
    }
    EditarAutoPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                PipesModule,
                RouterModule.forChild(routes)
            ],
            declarations: [
                EditarAutoPage
            ]
        })
    ], EditarAutoPageModule);
    return EditarAutoPageModule;
}());
export { EditarAutoPageModule };
//# sourceMappingURL=editar-auto.module.js.map