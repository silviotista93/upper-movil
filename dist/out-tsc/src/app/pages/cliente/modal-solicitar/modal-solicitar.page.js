import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { environment } from '../../../../environments/environment.prod';
import { ModalConfirmarSolicitudPage } from '../modal-confirmar-solicitud/modal-confirmar-solicitud.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UiServiceService } from 'src/app/service/ui-service.service';
var ModalSolicitarPage = /** @class */ (function () {
    function ModalSolicitarPage(modalCtrl, statusBar, navCtrl, uiService) {
        this.modalCtrl = modalCtrl;
        this.statusBar = statusBar;
        this.navCtrl = navCtrl;
        this.uiService = uiService;
        this.sliderConfig = {
            spaceBetween: 20,
            centeredSlides: false,
            slidesPerView: 1.2
        };
        this.carsSeleccData = [];
        this.cars_2 = [];
        this.carsDataPlan = [];
        this.URL = environment.url;
    }
    ModalSolicitarPage.prototype.ngOnInit = function () {
        this.cars_2 = this.nombre;
        console.log('estos son tus coches', this.cars_2);
        this.statusBar.hide();
    };
    // tslint:disable-next-line:use-life-cycle-interface
    ModalSolicitarPage.prototype.ngAfterViewInit = function () {
        this.navCtrl.pop();
    };
    ModalSolicitarPage.prototype.cerrar_modal = function () {
        this.statusBar.show();
        this.modalCtrl.dismiss();
    };
    ModalSolicitarPage.prototype.pushConfirmarServicio = function () {
        console.log('confirmar servicio');
    };
    ModalSolicitarPage.prototype.info_car = function (car) {
        this.desmarcarSeleccionado(car);
        if (car.seleccionado) {
            car.seleccionado = false;
            return;
        }
        car.seleccionado = true;
        this.carsDataPlan.push(car);
        this.abrirConfirmarServicio();
        setTimeout(function () {
            car.seleccionado = false;
        }, 500);
    };
    ModalSolicitarPage.prototype.desmarcarSeleccionado = function (carSelecc) {
        for (var _i = 0, _a = this.cars_2; _i < _a.length; _i++) {
            var car = _a[_i];
            if (car.board !== carSelecc.board) {
                car.seleccionado = false;
                this.carsDataPlan.pop();
            }
        }
    };
    // private dataCarPlan (carData:Car) {
    //    this.carsDataPlan.push(carData);
    // }
    // loadData() {
    //   console.log('cargando datos', this.carsDataPlan);
    //   return this.carsDataPlan;
    //  }
    //  abrirConfirmarServicio() {
    //    console.log('boton confirmar solicitud');
    //   this.navCtrl.navigateForward(`/menu/confirmar-solicitud`);
    //   this.modalCtrl.dismiss();
    //  }
    ModalSolicitarPage.prototype.abrirConfirmarServicio = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.carsDataPlan.length) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: ModalConfirmarSolicitudPage,
                                cssClass: 'test-modal',
                                componentProps: {
                                    nombre: this.carsDataPlan
                                }
                            })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.uiService.errorToast('Por favor selecciona un auto');
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ModalSolicitarPage.prototype, "nombre", void 0);
    ModalSolicitarPage = tslib_1.__decorate([
        Component({
            selector: 'app-modal-solicitar',
            templateUrl: './modal-solicitar.page.html',
            styleUrls: ['./modal-solicitar.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            StatusBar,
            NavController,
            UiServiceService])
    ], ModalSolicitarPage);
    return ModalSolicitarPage;
}());
export { ModalSolicitarPage };
//# sourceMappingURL=modal-solicitar.page.js.map