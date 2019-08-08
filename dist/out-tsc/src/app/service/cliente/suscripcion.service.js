import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { environment } from '../../../environments/environment';
var SuscripcionService = /** @class */ (function () {
    function SuscripcionService(http, userService) {
        this.http = http;
        this.userService = userService;
        this.URL = environment.url;
        this.plan = null;
        this.createPlan = null;
    }
    // #region OBTENER PLANES
    SuscripcionService.prototype.getPlans = function () {
        var headerToken = new HttpHeaders({
            'Authorization': this.userService.token,
        });
        return this.http.get(this.URL + "/api/plans/plans-all", { headers: headerToken });
    };
    SuscripcionService.prototype.firstPlans = function (id) {
        var headerToken = new HttpHeaders({
            'Authorization': this.userService.token,
        });
        return this.http.get(this.URL + "/api/plans/plans-first/" + id, { headers: headerToken });
    };
    SuscripcionService.prototype.firstPlans2 = function (id) {
        var _this = this;
        var headerToken = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.userService.token,
        });
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.URL + "/api/plans/plans-first/" + id, { headers: headerToken })
                .subscribe(function (resp) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    this.plan = resp['plan'];
                    resolve(this.plan);
                    console.log(this.plan);
                    return [2 /*return*/];
                });
            }); }, function (err) {
                reject(err);
            });
        });
    };
    SuscripcionService.prototype.getSuscriptionsClient = function () {
        var _this = this;
        var headerToken = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': this.userService.token,
        });
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.URL + "/api/suscripciones/suscripciones", { headers: headerToken })
                .subscribe(function (resp) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    resolve(resp['suscripciones']);
                    return [2 /*return*/];
                });
            }); }, function (err) {
                reject(err);
            });
        });
    };
    SuscripcionService.prototype.firstPlan = function (id) {
        var _this = this;
        var headerToken = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.userService.token,
        });
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.URL + "/api/payment/plan-suscription/" + id, { headers: headerToken })
                .subscribe(function (resp) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    resolve(resp);
                    console.log(resp['plan']);
                    return [2 /*return*/];
                });
            }); }, function (err) {
                reject(err);
            });
        });
    };
    // #region REGISTRO DE USUARIO
    SuscripcionService.prototype.registroSuscripcion = function (createPlan) {
        var _this = this;
        var headerToken = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.userService.token,
        });
        return new Promise(function (resolve) {
            _this.http.post(_this.URL + "/api/suscripciones/agregar-suscripcion", createPlan, { headers: headerToken })
                .subscribe(function (resp) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    if (!resp['ERROR']) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                    return [2 /*return*/];
                });
            }); }, function (err) {
                resolve(false);
            });
        });
    };
    SuscripcionService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            UserService])
    ], SuscripcionService);
    return SuscripcionService;
}());
export { SuscripcionService };
//# sourceMappingURL=suscripcion.service.js.map