import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from '../../../service/cliente/user.service';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { SuscripcionService } from '../../../service/cliente/suscripcion.service';
import { ModalPaymentPage } from '../modal-payment/modal-payment.page';
var SubscripcionPage = /** @class */ (function () {
    function SubscripcionPage(userService, navCtrl, serviSuscrip, modalCtrl, loadCtrl) {
        this.userService = userService;
        this.navCtrl = navCtrl;
        this.serviSuscrip = serviSuscrip;
        this.modalCtrl = modalCtrl;
        this.loadCtrl = loadCtrl;
        this.usuario = {};
        this.car = [];
        this.suscripciones = [];
    }
    SubscripcionPage.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    SubscripcionPage.prototype.ionViewWillEnter = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, loading;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.userService.getUsuario()];
                    case 1:
                        _a.usuario = _b.sent();
                        return [4 /*yield*/, this.loadCtrl.create({
                                spinner: 'crescent'
                            })];
                    case 2:
                        loading = _b.sent();
                        loading.present();
                        this.serviSuscrip.getSuscriptionsClient().then(function (data) {
                            _this.suscripciones = data;
                            console.log('listado', _this.suscripciones);
                            _this.suscripciones.reverse();
                            loading.dismiss();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SubscripcionPage.prototype.abrirListSubscripciones = function () {
        this.navCtrl.navigateForward('/menu/list-subscripciones');
    };
    SubscripcionPage.prototype.abrirModalPayment = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: ModalPaymentPage,
                            cssClass: 'payment-plan-modal',
                            componentProps: {
                                data: ''
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss().then(function () {
                                _this.ionViewWillEnter();
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    SubscripcionPage = tslib_1.__decorate([
        Component({
            selector: 'app-subscripcion',
            templateUrl: './subscripcion.page.html',
            styleUrls: ['./subscripcion.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [UserService,
            NavController,
            SuscripcionService,
            ModalController,
            LoadingController])
    ], SubscripcionPage);
    return SubscripcionPage;
}());
export { SubscripcionPage };
//# sourceMappingURL=subscripcion.page.js.map