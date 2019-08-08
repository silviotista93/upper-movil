import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from '../../../../environments/environment';
import { SuscripcionService } from '../../../service/cliente/suscripcion.service';
import { ModalInfoPlanPage } from '../modal-info-plan/modal-info-plan.page';
var ListSubscripcionesPage = /** @class */ (function () {
    function ListSubscripcionesPage(navCtrl, statusBar, loadCtrl, plansService, modalCtrl) {
        this.navCtrl = navCtrl;
        this.statusBar = statusBar;
        this.loadCtrl = loadCtrl;
        this.plansService = plansService;
        this.modalCtrl = modalCtrl;
        this.URL = environment.url;
        this.plans = [];
        // public plansDataSelec: Plan[] = [];
        // public planData: Plan = {}
        this.sliderConfig = {
            spaceBetween: 20,
            centeredSlides: false,
            slidesPerView: 1.2
        };
    }
    ListSubscripcionesPage.prototype.ngOnInit = function () {
        this.statusBar.hide();
        this.loadData();
    };
    // async ionViewWillEnter(){
    //    this.statusBar.hide();
    //    this.loadData();
    //   this.plansDataSelec.length = 0;
    //   console.log('viewWillEnter');
    // } 
    ListSubscripcionesPage.prototype.atras = function () {
        this.navCtrl.back();
        this.statusBar.show();
    };
    ListSubscripcionesPage.prototype.loadData = function () {
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
    ListSubscripcionesPage.prototype.abriPaymet = function () {
        this.navCtrl.navigateForward('/menu/paymet');
    };
    ListSubscripcionesPage.prototype.abrirModalDetallePlan = function (plan) {
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
    ListSubscripcionesPage = tslib_1.__decorate([
        Component({
            selector: 'app-list-subscripciones',
            templateUrl: './list-subscripciones.page.html',
            styleUrls: ['./list-subscripciones.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            StatusBar,
            LoadingController,
            SuscripcionService,
            ModalController])
    ], ListSubscripcionesPage);
    return ListSubscripcionesPage;
}());
export { ListSubscripcionesPage };
//# sourceMappingURL=list-subscripciones.page.js.map