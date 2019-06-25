import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
var AutosPage = /** @class */ (function () {
    function AutosPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AutosPage.prototype.ngOnInit = function () {
    };
    AutosPage.prototype.pushAgregarAuto = function () {
        this.navCtrl.navigateForward('/agregar-auto');
    };
    AutosPage = tslib_1.__decorate([
        Component({
            selector: 'app-autos',
            templateUrl: './autos.page.html',
            styleUrls: ['./autos.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController])
    ], AutosPage);
    return AutosPage;
}());
export { AutosPage };
//# sourceMappingURL=autos.page.js.map