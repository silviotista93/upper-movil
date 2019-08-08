import * as tslib_1 from "tslib";
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { NavController, LoadingController, Platform } from '@ionic/angular';
import { UiServiceService } from '../ui-service.service';
import { Subject } from 'rxjs';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
var CarService = /** @class */ (function () {
    function CarService(http, userService, uiService, navCtrl, loadCtrl, fileTransfer, platform) {
        this.http = http;
        this.userService = userService;
        this.uiService = uiService;
        this.navCtrl = navCtrl;
        this.loadCtrl = loadCtrl;
        this.fileTransfer = fileTransfer;
        this.platform = platform;
        this.image = "";
        this.URL = environment.url;
        this.token = null;
        this.car = {};
        this.first_car = {};
        this.brand = {};
        this.newCar = new EventEmitter();
        this.newPost = new Subject();
    }
    // #region OBTENER CARROS
    CarService.prototype.getCars = function () {
        var headerToken = new HttpHeaders({
            'Authorization': this.userService.token,
        });
        return this.http.get(this.URL + "/api/car/cars", { headers: headerToken });
    };
    CarService.prototype.getCarsPayment = function () {
        var headerToken = new HttpHeaders({
            'Authorization': this.userService.token,
        });
        return this.http.get(this.URL + "/api/payment/get-cars-plans", { headers: headerToken });
    };
    CarService.prototype.getCarsPlans = function () {
        var headerToken = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': this.userService.token,
        });
        return this.http.get(this.URL + "/api/car/cars-plans", { headers: headerToken });
    };
    CarService.prototype.firstCar = function (id) {
        var _this = this;
        var headerToken = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.userService.token,
        });
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.URL + "/api/payment/car-suscription/" + id, { headers: headerToken })
                .subscribe(function (resp) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    resolve(resp);
                    console.log(resp['car']);
                    return [2 /*return*/];
                });
            }); }, function (err) {
                reject(err);
            });
        });
    };
    //  getPlanTypeWashes(id: string) {
    //   const data = { id };
    //   const headerToken = new HttpHeaders({
    //     'Authorization': this.userService.token,
    //   });
    //   return  this.http.post(`${this.URL}/api/car/plan-type-washes`, data, { headers: headerToken })
    //       .subscribe(async resp => {
    //         console.log(resp);
    //         return resp['plan-type-washes'];
    //       }, err => {
    //       });
    //  }
    // #endregion
    // #region OBTENER MARCAS/BRANDS
    CarService.prototype.getBrand = function () {
        var headerToken = new HttpHeaders({
            'Authorization': this.userService.token,
        });
        return this.http.get(this.URL + "/api/car/brand", { headers: headerToken });
    };
    // #endregion
    // #region OBTENER COLOR
    CarService.prototype.getColor = function () {
        var headerToken = new HttpHeaders({
            'Authorization': this.userService.token,
        });
        return this.http.get(this.URL + "/api/car/color", { headers: headerToken });
    };
    // #endregion
    // #region OBTENER TIPO CARRO
    CarService.prototype.getCarType = function () {
        var headerToken = new HttpHeaders({
            'Authorization': this.userService.token,
        });
        return this.http.get(this.URL + "/api/car/car-type", { headers: headerToken });
    };
    // #endregion
    // #region OBTENER CILINDRAJE
    CarService.prototype.getCilindraje = function () {
        var headerToken = new HttpHeaders({
            'Authorization': this.userService.token,
        });
        return this.http.get(this.URL + "/api/car/cilindraje", { headers: headerToken });
    };
    // #endregion
    // #region Crear Carro
    CarService.prototype.createCar = function (car) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading, headerToken;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadCtrl.create({
                            spinner: 'crescent'
                        })];
                    case 1:
                        loading = _a.sent();
                        loading.present();
                        headerToken = new HttpHeaders({
                            'Authorization': this.userService.token,
                        });
                        return [2 /*return*/, new Promise(function (resolve) {
                                _this.http.post(_this.URL + "/api/car/create-car", car, { headers: headerToken })
                                    .subscribe(function (resp) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    return tslib_1.__generator(this, function (_a) {
                                        if (resp['car']) {
                                            this.uiService.successToast(resp['message']);
                                            this.navCtrl.navigateRoot('/menu/autos', { animated: true });
                                            loading.dismiss();
                                            resolve(true);
                                        }
                                        else {
                                            this.uiService.successToast(resp['No se creo el carro']);
                                            loading.dismiss();
                                            resolve(false);
                                        }
                                        return [2 /*return*/];
                                    });
                                }); }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var errores_1, msgError_1;
                                    return tslib_1.__generator(this, function (_a) {
                                        loading.dismiss();
                                        console.log('esta es la respuesta error');
                                        console.log(err);
                                        if (err['error']["errors"]) {
                                            errores_1 = err['error']["errors"];
                                            msgError_1 = "";
                                            Object.keys(errores_1).map(function (error) {
                                                var detalle = errores_1[error][0];
                                                msgError_1 += detalle + "\n";
                                            });
                                            if (msgError_1 !== "") {
                                                this.uiService.errorToast(msgError_1);
                                            }
                                            resolve(true);
                                        }
                                        resolve(false);
                                        return [2 /*return*/];
                                    });
                                }); });
                            })];
                }
            });
        });
    };
    // #endregion
    // #region Subir Foto
    CarService.prototype.uploadPicture = function (img) {
        var _this = this;
        var options = {
            fileKey: 'picture',
            headers: { 'Authorization': this.userService.token }
        };
        var fileTransfer = this.fileTransfer.create();
        return new Promise(function (resolve) {
            fileTransfer.upload(img, _this.URL + "/api/car/upload-picture", options)
                .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, data.response];
                        case 1:
                            _a.image = _b.sent();
                            console.log('image', this.image);
                            resolve(true);
                            return [2 /*return*/];
                    }
                });
            }); }).catch(function (err) {
                console.log('error', err);
                resolve(false);
            });
        });
    };
    // #endregion
    // #region BORRAR AUTO
    CarService.prototype.deleteCar = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading, headerToken;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadCtrl.create({
                            spinner: 'crescent'
                        })];
                    case 1:
                        loading = _a.sent();
                        loading.present();
                        headerToken = new HttpHeaders({
                            'Authorization': this.userService.token,
                        });
                        return [2 /*return*/, new Promise(function (resolve) {
                                _this.http.post(_this.URL + "/api/car/delete-car", id, { headers: headerToken })
                                    .subscribe(function (resp) {
                                    //CORREGIR ELIMINAR
                                    _this.uiService.successToast(resp['message']);
                                    console.log('Carro eliminado', resp['cars']);
                                    loading.dismiss();
                                    resolve(true);
                                }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    return tslib_1.__generator(this, function (_a) {
                                        loading.dismiss();
                                        console.log(err);
                                        console.log('NoOO eliminado el carro');
                                        this.uiService.errorToast('El auto no se elimino');
                                        resolve(false);
                                        return [2 /*return*/];
                                    });
                                }); });
                            })];
                }
            });
        });
    };
    // #endregion
    // #region Obtener un solo carro
    CarService.prototype.getCar = function (id) {
        var headerToken = new HttpHeaders({
            'Authorization': this.userService.token,
        });
        return this.http.get(this.URL + "/api/car/car/" + id, { headers: headerToken });
    };
    //#endregion
    // #region ACTUALIZAR AUTO
    CarService.prototype.updateCar = function (car) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading, headerToken;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadCtrl.create({
                            spinner: 'crescent'
                        })];
                    case 1:
                        loading = _a.sent();
                        loading.present();
                        headerToken = new HttpHeaders({
                            'Authorization': this.userService.token,
                        });
                        return [2 /*return*/, new Promise(function (resolve) {
                                _this.http.put(_this.URL + "/api/car/update-car", car, { headers: headerToken })
                                    .subscribe(function (resp) {
                                    // console.log(resp);
                                    loading.dismiss();
                                    _this.uiService.successToast(resp['message']);
                                    _this.navCtrl.navigateRoot('/menu/autos', { animated: true });
                                    resolve(true);
                                }, function (err) {
                                    console.log(err);
                                    loading.dismiss();
                                    if (err['error']["errors"]) {
                                        var errores_2 = err['error']["errors"];
                                        var msgError_2 = "";
                                        Object.keys(errores_2).map(function (error) {
                                            var detalle = errores_2[error][0];
                                            msgError_2 += detalle + "\n";
                                        });
                                        if (msgError_2 !== "") {
                                            _this.uiService.errorToast(msgError_2);
                                        }
                                        resolve(true);
                                    }
                                    resolve(false);
                                });
                            })];
                }
            });
        });
    };
    //#endregion
    // #region ACTUALIZAR FOTO AUTO
    CarService.prototype.updatePicture = function (img, id) {
        var _this = this;
        var options = {
            fileKey: 'picture',
            headers: { 'Authorization': this.userService.token },
            params: { 'id': id }
        };
        var fileTransfer = this.fileTransfer.create();
        return new Promise(function (resolve) {
            fileTransfer.upload(img, _this.URL + "/api/car/update-picture", options)
                .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, data.response];
                        case 1:
                            _a.image = _b.sent();
                            console.log('imagen actualizada', this.image);
                            resolve(true);
                            return [2 /*return*/];
                    }
                });
            }); }).catch(function (err) {
                console.log('error', err);
                resolve(false);
            });
        });
    };
    CarService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            UserService,
            UiServiceService,
            NavController,
            LoadingController,
            FileTransfer,
            Platform])
    ], CarService);
    return CarService;
}());
export { CarService };
//# sourceMappingURL=car.service.js.map