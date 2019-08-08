import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { UiServiceService } from '../ui-service.service';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { NavController } from '@ionic/angular';
var CuentaService = /** @class */ (function () {
    function CuentaService(userService, http, fileTransfer, navCtrl, uiService) {
        this.userService = userService;
        this.http = http;
        this.fileTransfer = fileTransfer;
        this.navCtrl = navCtrl;
        this.uiService = uiService;
        //#region Variable y headers
        this.URL = environment.url;
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': this.userService.token,
        });
        //#endregion
        this.image = "";
    }
    // #region Actualizar contraseña
    CuentaService.prototype.updatePassword = function (password, password_confirmation, id) {
        var _this = this;
        var data = { password: password, password_confirmation: password_confirmation, id: id };
        return new Promise(function (resolve) {
            _this.http.post(_this.URL + "/api/profile/update-password", data, { headers: _this.headers })
                .subscribe(function (resp) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!resp['access_token']) return [3 /*break*/, 2];
                            this.userService.token = resp['token_type'] + ' ' + resp['access_token'];
                            return [4 /*yield*/, this.userService.saveToken(this.userService.token)];
                        case 1:
                            _a.sent();
                            this.navCtrl.navigateRoot('/menu/home', { animated: true });
                            this.uiService.successToast(resp['message']);
                            resolve(true);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var errores_1, msgError_1;
                return tslib_1.__generator(this, function (_a) {
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
        });
    };
    // #endregion
    // #region Actualizar usuario
    CuentaService.prototype.updateProfile2 = function (user) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.URL + "/api/profile/update", user, { headers: _this.headers })
                .subscribe(function (resp) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!resp['access_token']) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.userService.saveToken(resp['token_type'] + ' ' + resp['access_token'])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.userService.validaToken()];
                        case 2:
                            _a.sent();
                            this.uiService.successToast(resp['message']);
                            // window.location.reload();
                            resolve(true);
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); }, function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var errores_2, msgError_2;
                return tslib_1.__generator(this, function (_a) {
                    console.log(err);
                    if (err['error']["errors"]) {
                        errores_2 = err['error']["errors"];
                        msgError_2 = "";
                        Object.keys(errores_2).map(function (error) {
                            var detalle = errores_2[error][0];
                            msgError_2 += detalle + "\n";
                        });
                        if (msgError_2 !== "") {
                            this.uiService.errorToast(msgError_2);
                        }
                        resolve(true);
                    }
                    resolve(false);
                    return [2 /*return*/];
                });
            }); });
        });
    };
    // #endregion
    // #region Actulizar Foto
    CuentaService.prototype.updateAvatar = function (img) {
        var _this = this;
        var options = {
            fileKey: 'avatar',
            headers: { 'Authorization': this.userService.token }
        };
        var fileTransfer = this.fileTransfer.create();
        return new Promise(function (resolve) {
            fileTransfer.upload(img, _this.URL + "/api/profile/update-avatar", options)
                .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, data.response];
                        case 1:
                            _a.image = _b.sent();
                            this.userService.usuario.avatar = this.image;
                            this.uiService.successToast('¡Imagen actualizada!');
                            resolve(true);
                            return [2 /*return*/];
                    }
                });
            }); }).catch(function (err) {
                console.log('error', err);
            });
        });
    };
    CuentaService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [UserService,
            HttpClient,
            FileTransfer,
            NavController,
            UiServiceService])
    ], CuentaService);
    return CuentaService;
}());
export { CuentaService };
//# sourceMappingURL=cuenta.service.js.map