import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { OrderService } from '../../../service/cliente/order.service';
var HistorialPage = /** @class */ (function () {
    function HistorialPage(navCtrl, loadCtrl, orderService) {
        this.navCtrl = navCtrl;
        this.loadCtrl = loadCtrl;
        this.orderService = orderService;
        this.order = [];
        this.idDetalle = 1;
    }
    HistorialPage.prototype.ngOnInit = function () {
        // this.loadData();
        // console.log(this.order);
    };
    HistorialPage.prototype.ionViewWillEnter = function () {
        this.loadData();
        console.log(this.order);
    };
    HistorialPage.prototype.pushDetalleLavado = function (id) {
        this.navCtrl.navigateForward("/menu/detalle-lavado/" + id);
    };
    HistorialPage.prototype.loadData = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadCtrl.create({
                            spinner: 'crescent'
                        })];
                    case 1:
                        loading = _a.sent();
                        loading.present();
                        this.orderService.getOrden().subscribe(function (resp) {
                            var _a;
                            (_a = _this.order).push.apply(_a, resp['orders']);
                            _this.order.reverse();
                            loading.dismiss();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    HistorialPage = tslib_1.__decorate([
        Component({
            selector: 'app-historial',
            templateUrl: './historial.page.html',
            styleUrls: ['./historial.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            LoadingController,
            OrderService])
    ], HistorialPage);
    return HistorialPage;
}());
export { HistorialPage };
//# sourceMappingURL=historial.page.js.map