import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
var URL = environment.url;
var headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
});
var UserService = /** @class */ (function () {
    function UserService(http, storage, navCtrl) {
        this.http = http;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.token = null;
        this.usuario = {};
    }
    UserService.prototype.login = function (email, password) {
        var _this = this;
        var data = { email: email, password: password };
        return new Promise(function (resolve) {
            _this.http.post(URL + "/api/auth/login", data, { headers: headers })
                .subscribe(function (resp) {
                console.log(resp);
                if (resp['access_token']) {
                    _this.token = resp['token_type'] + ' ' + resp['access_token'];
                    _this.saveToken(_this.token);
                    resolve(true);
                }
                else {
                    _this.token = null;
                    _this.storage.clear();
                    resolve(false);
                }
            }, function (err) {
                _this.token = null;
                _this.storage.clear();
                resolve(false);
            });
        });
    };
    UserService.prototype.loginFacebook = function (usuario) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(URL + "/api/auth/login-facebook", usuario, { headers: headers })
                .subscribe(function (resp) {
                console.log(resp);
                if (resp['access_token']) {
                    _this.token = resp['token_type'] + ' ' + resp['access_token'];
                    _this.saveToken(_this.token);
                    resolve(true);
                }
                else {
                    _this.token = null;
                    _this.storage.clear();
                    resolve(false);
                }
            }, function (err) {
                _this.token = null;
                _this.storage.clear();
                resolve(false);
            });
        });
    };
    UserService.prototype.registro = function (usuario) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(URL + "/api/auth/signup", usuario, { headers: headers })
                .subscribe(function (resp) {
                if (!resp['ERROR']) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }, function (err) {
                resolve(false);
            });
        });
    };
    UserService.prototype.getUsuario = function () {
        if (!this.usuario.id) {
            this.validaToken();
        }
        return tslib_1.__assign({}, this.usuario);
    };
    UserService.prototype.saveToken = function (token) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.token = token;
                        return [4 /*yield*/, this.storage.set('token', token)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.loadToken = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.storage.get('token')];
                    case 1:
                        _a.token = (_b.sent()) || null;
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.validaToken = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var headerToken;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadToken()];
                    case 1:
                        _a.sent();
                        if (!this.token) {
                            this.navCtrl.navigateRoot('/login');
                            return [2 /*return*/, Promise.resolve(false)];
                        }
                        headerToken = new HttpHeaders({
                            'Authorization': this.token,
                        });
                        return [2 /*return*/, new Promise(function (resolve) {
                                _this.http.get(URL + "/api/auth/user", { headers: headerToken })
                                    .subscribe(function (resp) {
                                    if (resp['user']) {
                                        console.log(' didiera ramirez', resp);
                                        _this.usuario = resp['user'];
                                        resolve(true);
                                    }
                                    else {
                                        _this.navCtrl.navigateRoot('/login');
                                        resolve(false);
                                    }
                                });
                            })];
                }
            });
        });
    };
    UserService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Storage, NavController])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map