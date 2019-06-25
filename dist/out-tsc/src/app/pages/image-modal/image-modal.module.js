import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ImageModalPage } from './image-modal.page';
var routes = [
    {
        path: '',
        component: ImageModalPage
    }
];
var ImageModalPageModule = /** @class */ (function () {
    function ImageModalPageModule() {
    }
    ImageModalPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ImageModalPage]
        })
    ], ImageModalPageModule);
    return ImageModalPageModule;
}());
export { ImageModalPageModule };
//# sourceMappingURL=image-modal.module.js.map