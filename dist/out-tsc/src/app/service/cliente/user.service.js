import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { UiServiceService } from '../ui-service.service';
var URL = environment.url;
var headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
});
var UserService = /** @class */ (function () {
    function UserService(http, storage, navCtrl, uiService) {
        this.http = http;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.uiService = uiService;
        this.token = null;
        this.usuario = {};
    }
    // #region LOGIN
    UserService.prototype.login = function (email, password) {
        var _this = this;
        var data = { email: email, password: password };
        return new Promise(function (resolve) {
            _this.http.post(URL + "/api/auth/login", data, { headers: headers })
                .subscribe(function (resp) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!resp['access_token']) return [3 /*break*/, 2];
                            this.token = resp['token_type'] + ' ' + resp['access_token'];
                            return [4 /*yield*/, this.saveToken(this.token)];
                        case 1:
                            _a.sent();
                            resolve(true);
                            return [3 /*break*/, 3];
                        case 2:
                            this.token = null;
                            this.storage.clear();
                            resolve(false);
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); }, function (err) {
                _this.token = null;
                _this.storage.clear();
                resolve(false);
            });
        });
    };
    //#endregion
    // #region LOGIN DE FACEBOOK
    UserService.prototype.loginFacebook = function (usuario) {
        var _this = this;
        console.log('ESTAMOS EN LA FUNCION DE LARAVEL', usuario);
        return new Promise(function (resolve) {
            _this.http.post(URL + "/api/auth/login-facebook", usuario, { headers: headers })
                .subscribe(function (resp) {
                console.log('respuesta', JSON.stringify(resp));
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
                console.log('err', JSON.stringify(err));
                _this.token = null;
                _this.storage.clear();
                resolve(false);
            });
        });
    };
    // #endregion
    // #region LOGOUT
    UserService.prototype.logout = function () {
        this.token = null;
        this.usuario = null;
        this.storage.clear();
        console.log('limpio el storage');
        this.navCtrl.navigateRoot('login', { animated: true });
    };
    // #endregion
    // #region REGISTRO DE USUARIO
    UserService.prototype.registro = function (usuario) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(URL + "/api/auth/signup", usuario, { headers: headers })
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
    // #endregion
    // #region RESTABLECER CONTRASEÑA
    UserService.prototype.forgotPassword = function (email) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(URL + "/api/auth/forgot-password", email, { headers: headers })
                .subscribe(function (resp) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    if (resp['success']) {
                        resolve(true);
                    }
                    else {
                        this.uiService.errorToast('Correo electrónico no existe');
                        resolve(false);
                    }
                    return [2 /*return*/];
                });
            }); }, function (err) {
                resolve(false);
            });
        });
    };
    // #endregion
    // #region OBTENER USUARIO
    UserService.prototype.getUsuario = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (!this.usuario) {
                    this.validaToken();
                }
                this.validaToken();
                return [2 /*return*/, tslib_1.__assign({}, this.usuario)];
            });
        });
    };
    // #endregion
    // #region GUARDAR TOKEN
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
    // #endregion
    // #region CARGAR TOKEN
    UserService.prototype.loadToken = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.storage.get('token')];
                    case 1: return [2 /*return*/, _a.token = (_b.sent()) || null];
                }
            });
        });
    };
    // #endregion
    // #region VALIDAR TOKEN
    UserService.prototype.validaToken = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
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
                        return [2 /*return*/, new Promise(function (resolve) {
                                var headerToken = new HttpHeaders({
                                    'Authorization': _this.token,
                                });
                                _this.http.get(URL + "/api/auth/user/", { headers: headerToken })
                                    .subscribe(function (resp) {
                                    _this.roles = resp['user']['roles'];
                                    var rol = _this.roles[0].id;
                                    var status = resp['user']['state'];
                                    if (rol === 3) {
                                        if (status === '1') {
                                            _this.usuario = resp['user'];
                                            resolve(true);
                                        }
                                        else {
                                            _this.uiService.alertInfo2('Usuario se encuentra inactivo');
                                            resolve(false);
                                        }
                                    }
                                    else {
                                        _this.uiService.errorToast('No tienes pemisos para iniciar');
                                        _this.logout();
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
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            Storage,
            NavController,
            UiServiceService])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map