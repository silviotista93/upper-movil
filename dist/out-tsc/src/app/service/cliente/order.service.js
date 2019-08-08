import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UiServiceService } from '../ui-service.service';
import { UserService } from './user.service';
var headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
});
var OrderService = /** @class */ (function () {
    function OrderService(http, userService, uiService) {
        this.http = http;
        this.userService = userService;
        this.uiService = uiService;
        this.URL = environment.url;
        this.token = null;
        this.order = {};
        this.order2 = {};
        this.car_suscription2 = {};
        this.car = {};
    }
    //#region Validar token 
    OrderService.prototype.validateToken = function () {
        var _this = this;
        this.token = this.userService.token;
        return new Promise(function (resolve) {
            var headerToken = new HttpHeaders({
                'Authorization': _this.userService.token,
            });
            _this.http.get(_this.URL + "/api/car/cars", { headers: headerToken })
                .subscribe(function (resp) {
                if (resp['cars']) {
                    console.log('Car valida token ', resp);
                    _this.order = resp['cars'];
                    console.log('estos son los carros ', _this.order);
                    resolve(true);
                }
                else {
                    // this.navCtrl.navigateRoot('/login');
                    console.log('else de la promesa');
                    resolve(false);
                }
            });
        });
    };
    //#endregion
    OrderService.prototype.getOrden = function () {
        var headerToken = new HttpHeaders({
            'Authorization': this.userService.token,
            'Content-Type': 'application/json',
        });
        return this.http.get(this.URL + "/api/order/index-client-order", { headers: headerToken });
    };
    OrderService.prototype.createOrder = function (order) {
        var _this = this;
        var headerToken = new HttpHeaders({
            'Authorization': this.userService.token,
            'Content-Type': 'application/json',
        });
        return new Promise(function (resolve) {
            _this.http.post(_this.URL + "/api/order/create-order", order, { headers: headerToken })
                .subscribe(function (resp) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    if (!resp['ERROR']) {
                        console.log('ok, realizado');
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                    return [2 /*return*/];
                });
            }); }, function (err) {
                console.log('err', err);
                resolve(false);
            });
        });
    };
    // getDetailOrden(id: any) {
    //    const headerToken = new HttpHeaders({
    //    'Content-Type': 'application/json',
    //      'Authorization': this.userService.token,
    //    });
    //    return  this.http.get(`${this.URL}/api/order/detail-orden/${id}`, { headers: headerToken })
    //        .subscribe(async resp => {
    //          console.log('didier', resp);
    //          this.order2 = resp['detail-order'];
    //          console.log('karen Rodriguez', this.order2)
    //          return this.order2;
    //        }, err => {
    //        });
    // }
    OrderService.prototype.getCarSuscriptionOrden = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var headerToken;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headerToken = new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': this.userService.token,
                        });
                        return [4 /*yield*/, this.http.get(this.URL + "/api/order/detail-car-suscription/" + id, { headers: headerToken })
                                .subscribe(function (resp) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    this.car_suscription2 = resp['car_suscription'];
                                    console.log('car sus desde el servicio', this.car_suscription2);
                                    this.car = this.car_suscription2['car'];
                                    return [2 /*return*/, this.car];
                                });
                            }); }, function (err) {
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OrderService.prototype.getDetailOrden = function (id) {
        var _this = this;
        var headerToken = new HttpHeaders({
            'Authorization': this.userService.token,
            'Content-Type': 'application/json',
        });
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.URL + "/api/order/detail-orden/" + id, { headers: headerToken })
                .subscribe(function (resp) {
                resolve(resp['detail-order']);
                console.log(resp);
            }, function (err) {
            });
        });
    };
    OrderService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            UserService,
            UiServiceService])
    ], OrderService);
    return OrderService;
}());
export { OrderService };
//# sourceMappingURL=order.service.js.map