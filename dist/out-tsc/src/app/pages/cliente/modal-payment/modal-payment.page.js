import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController, LoadingController, IonSlides } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from '../../../../environments/environment';
import { SuscripcionService } from '../../../service/cliente/suscripcion.service';
import { ModalInfoPlanPage } from '../modal-info-plan/modal-info-plan.page';
import { CarService } from '../../../service/cliente/car.service';
import { UiServiceService } from '../../../service/ui-service.service';
import { ModalAlertPlanAutoPage } from '../modal-alert-plan-auto/modal-alert-plan-auto.page';
var ModalPaymentPage = /** @class */ (function () {
    function ModalPaymentPage(modalCtrl, modalCtrlAlert, statusBar, navCtrl, carService, loadCtrl, plansService, uiService) {
        this.modalCtrl = modalCtrl;
        this.modalCtrlAlert = modalCtrlAlert;
        this.statusBar = statusBar;
        this.navCtrl = navCtrl;
        this.carService = carService;
        this.loadCtrl = loadCtrl;
        this.plansService = plansService;
        this.uiService = uiService;
        this.sliderConfig = {
            spaceBetween: 20,
            centeredSlides: false,
            slidesPerView: 1.2
        };
        this.URL = environment.url;
        this.plans = [];
        this.firstPlan = null;
        this.cars = [];
        this.firstCars = {};
        this.createPlan = null;
    }
    ModalPaymentPage.prototype.ngOnInit = function () {
        this.statusBar.hide();
        this.loadData();
        this.loadDataCars();
        this.slide.lockSwipes(true);
    };
    ModalPaymentPage.prototype.loadData = function () {
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
                        this.plansService.getPlans().subscribe(function (resp) {
                            var _a;
                            (_a = _this.plans).push.apply(_a, resp['plans']);
                            loading.dismiss();
                            // event.target.complete();
                            console.log('Planes', _this.plans);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalPaymentPage.prototype.loadDataCars = function () {
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
                        this.carService.getCarsPayment().subscribe(function (resp) {
                            var _a;
                            (_a = _this.cars).push.apply(_a, resp['cars']);
                            loading.dismiss();
                            // event.target.complete();
                            console.log('Cars', _this.cars);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalPaymentPage.prototype.cerrar_modal = function () {
        this.modalCtrl.dismiss();
        this.statusBar.show();
    };
    ModalPaymentPage.prototype.abrirModalDetallePlan = function (plan) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: ModalInfoPlanPage,
                            cssClass: 'info-plan-modal',
                            componentProps: {
                                nombre: plan.id
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    ModalPaymentPage.prototype.mostrarAutos = function (plan) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.slide.lockSwipes(false);
                        if (!(this.cars.length > 0)) return [3 /*break*/, 1];
                        this.slide.slideTo(1);
                        this.plan_id = plan.id;
                        this.slide.lockSwipes(true);
                        return [3 /*break*/, 4];
                    case 1:
                        this.cerrar_modal();
                        return [4 /*yield*/, this.modalCtrlAlert.create({
                                component: ModalAlertPlanAutoPage,
                                cssClass: 'modal-alert-css',
                                componentProps: {
                                    nombre: ''
                                },
                                backdropDismiss: false
                            })];
                    case 2:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ModalPaymentPage.prototype.mostrarMetodosPago = function (car) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.slide.lockSwipes(false);
                        this.slide.slideTo(2);
                        this.car_id = car.id;
                        this.createPlan = {
                            plan_id: this.plan_id,
                            car_id: this.car_id
                        };
                        return [4 /*yield*/, this.loadCtrl.create({
                                spinner: 'crescent'
                            })];
                    case 1:
                        loading = _a.sent();
                        loading.present();
                        this.carService.firstCar(this.car_id).then(function (data) {
                            _this.firstCars = data;
                            console.log('auto seleccionado', _this.firstCars);
                        });
                        this.plansService.firstPlan(this.plan_id).then(function (data) {
                            _this.firstPlan = data;
                            console.log('plan seleccionado', _this.firstPlan);
                        });
                        loading.dismiss();
                        this.slide.lockSwipes(true);
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalPaymentPage.prototype.agregarSuscripcion = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading, validated;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadCtrl.create({
                            spinner: 'crescent'
                        })];
                    case 1:
                        loading = _a.sent();
                        loading.present();
                        this.createPlan = {
                            plan_id: this.plan_id,
                            car_id: this.car_id
                        };
                        console.log(this.createPlan);
                        return [4 /*yield*/, this.plansService.registroSuscripcion(this.createPlan)];
                    case 2:
                        validated = _a.sent();
                        if (validated) {
                            loading.dismiss();
                            this.uiService.successToast('Suscripcion creada exitosamente');
                            this.cerrar_modal();
                        }
                        else {
                            loading.dismiss();
                            this.cerrar_modal();
                            this.uiService.errorToast('Error, verifica tus datos');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        ViewChild('sliderPrincipal'),
        tslib_1.__metadata("design:type", IonSlides)
    ], ModalPaymentPage.prototype, "slide", void 0);
    ModalPaymentPage = tslib_1.__decorate([
        Component({
            selector: 'app-modal-payment',
            templateUrl: './modal-payment.page.html',
            styleUrls: ['./modal-payment.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            ModalController,
            StatusBar,
            NavController,
            CarService,
            LoadingController,
            SuscripcionService,
            UiServiceService])
    ], ModalPaymentPage);
    return ModalPaymentPage;
}());
export { ModalPaymentPage };
//# sourceMappingURL=modal-payment.page.js.map