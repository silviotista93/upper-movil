import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
var HistorialPage = /** @class */ (function () {
    function HistorialPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HistorialPage.prototype.ngOnInit = function () {
    };
    HistorialPage.prototype.pushDetalleLavado = function () {
        this.navCtrl.navigateForward('/detalle-lavado');
    };
    HistorialPage = tslib_1.__decorate([
        Component({
            selector: 'app-historial',
            templateUrl: './historial.page.html',
            styleUrls: ['./historial.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController])
    ], HistorialPage);
    return HistorialPage;
}());
export { HistorialPage };
//# sourceMappingURL=historial.page.js.map