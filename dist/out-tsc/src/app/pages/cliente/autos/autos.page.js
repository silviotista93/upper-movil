import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController, AlertController } from '@ionic/angular';
import { CarService } from '../../../service/cliente/car.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../../../service/cliente/user.service';
import { UiServiceService } from '../../../service/ui-service.service';
var AutosPage = /** @class */ (function () {
    function AutosPage(navCtrl, carService, loadCtrl, actionSheetController, alertCtrl, uiService, userService) {
        this.navCtrl = navCtrl;
        this.carService = carService;
        this.loadCtrl = loadCtrl;
        this.actionSheetController = actionSheetController;
        this.alertCtrl = alertCtrl;
        this.uiService = uiService;
        this.userService = userService;
        this.cars = [];
        this.URL = environment.url;
        this.user = {};
    }
    AutosPage.prototype.ngOnInit = function () {
        // this.doRefresh(this.evento);
        // this.loadData();
        // this.user = this.userService.getUsuario();
        // console.log('usuario ', this.user);
    };
    AutosPage.prototype.ionViewWillEnter = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.cars = [];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.userService.getUsuario()];
                    case 2:
                        _a.user = _b.sent();
                        console.log('auto ', this.cars);
                        return [2 /*return*/];
                }
            });
        });
    };
    AutosPage.prototype.pushAgregarAuto = function () {
        this.navCtrl.navigateForward('/menu/agregar-auto');
    };
    // #region Cargar Datos
    AutosPage.prototype.loadData = function () {
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
                        this.carService.getCars().subscribe(function (resp) {
                            var _a;
                            (_a = _this.cars).push.apply(_a, resp['cars']);
                            _this.cars.reverse();
                            loading.dismiss();
                            // event.target.complete();
                            console.log('Los carros ', _this.cars);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    // #endregion
    // #region Action sheet
    AutosPage.prototype.lanzarMenu = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var id, actionSheet;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = event.srcElement.id.toString();
                        this.carService.carId = id;
                        console.log('car id antes de actionsheet', id);
                        return [4 /*yield*/, this.actionSheetController.create({
                                buttons: [{
                                        text: 'Editar',
                                        icon: 'create',
                                        handler: function () {
                                            console.log('Editar clicked');
                                            // this.carService.getCar();
                                            _this.navCtrl.navigateForward("/menu/editar-auto/" + id);
                                            // this.router.navigate(['/menu/editar-auto', { item: id }]);
                                        }
                                    }, {
                                        text: 'Eliminar',
                                        role: 'destructive',
                                        icon: 'trash',
                                        handler: function () {
                                            console.log('Delete clicked');
                                            var message = "¿Desea eliminar el auto?";
                                            _this.presentConfirm(message, id);
                                        }
                                    }, {
                                        text: 'Cancelar',
                                        icon: 'close',
                                        role: 'cancel',
                                        handler: function () {
                                            console.log('Cancel clicked');
                                        }
                                    }]
                            })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // #endregion
    // #region Alerta confirmacion de eliminar
    AutosPage.prototype.presentConfirm = function (message, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert2;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            message: message,
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                },
                                {
                                    text: 'Aceptar',
                                    handler: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var val;
                                        return tslib_1.__generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    console.log('aceptar');
                                                    return [4 /*yield*/, this.carService.deleteCar(id)];
                                                case 1:
                                                    val = _a.sent();
                                                    if (val) {
                                                        this.ionViewWillEnter();
                                                    }
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }
                                }
                            ]
                        })];
                    case 1:
                        alert2 = _a.sent();
                        return [4 /*yield*/, alert2.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AutosPage = tslib_1.__decorate([
        Component({
            selector: 'app-autos',
            templateUrl: './autos.page.html',
            styleUrls: ['./autos.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            CarService,
            LoadingController,
            ActionSheetController,
            AlertController,
            UiServiceService,
            UserService])
    ], AutosPage);
    return AutosPage;
}());
export { AutosPage };
//# sourceMappingURL=autos.page.js.map