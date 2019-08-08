import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from '../../../service/cliente/user.service';
import { environment } from '../../../../environments/environment';
import { LoadingController, NavController, ActionSheetController } from '@ionic/angular';
import { UiServiceService } from '../../../service/ui-service.service';
import { CuentaService } from '../../../service/cliente/cuenta.service';
import { Camera } from '@ionic-native/camera/ngx';
var CuentaPage = /** @class */ (function () {
    function CuentaPage(userService, cuentaService, loadCtrl, navCtrl, actSheetCtrl, camera, uiService) {
        this.userService = userService;
        this.cuentaService = cuentaService;
        this.loadCtrl = loadCtrl;
        this.navCtrl = navCtrl;
        this.actSheetCtrl = actSheetCtrl;
        this.camera = camera;
        this.uiService = uiService;
        this.URL = environment.url;
        this.usuario = {};
        this.dataPassword = {
            password: '',
            password_confirmation: '',
        };
    }
    CuentaPage.prototype.ngOnInit = function () {
    };
    CuentaPage.prototype.ionViewWillEnter = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.userService.getUsuario()];
                    case 1:
                        _a.usuario = _b.sent();
                        this.image = this.usuario.avatar;
                        this.name = this.usuario.names;
                        this.lastname = this.usuario.last_name;
                        return [2 /*return*/];
                }
            });
        });
    };
    CuentaPage.prototype.logout = function () {
        this.userService.logout();
    };
    //#region ACTUALIZAR CONTRASEÑA
    CuentaPage.prototype.updatePassword = function (fPassword) {
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
                        if (fPassword.invalid) {
                            loading.dismiss();
                            this.uiService.errorToast('Todos los campos son obligatorios');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.cuentaService.updatePassword(this.dataPassword.password, this.dataPassword.password_confirmation, this.usuario.id)];
                    case 2:
                        validated = _a.sent();
                        if (validated) {
                            this.dataPassword = {
                                password: '',
                                password_confirmation: ''
                            };
                            loading.dismiss();
                        }
                        else {
                            this.dataPassword = {
                                password: '',
                                password_confirmation: ''
                            };
                            loading.dismiss();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // #endregion
    //#region ACTUALIZAR PERFIL
    CuentaPage.prototype.updateProfile = function (fProfile) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading, validated;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.usuario.names = this.name;
                        this.usuario.last_name = this.lastname;
                        return [4 /*yield*/, this.loadCtrl.create({
                                spinner: 'crescent'
                            })];
                    case 1:
                        loading = _a.sent();
                        loading.present();
                        if (fProfile.invalid) {
                            loading.dismiss();
                            this.uiService.errorToast('Todos los campos son obligatorios');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.cuentaService.updateProfile2(this.usuario)];
                    case 2:
                        validated = _a.sent();
                        if (!validated) return [3 /*break*/, 4];
                        loading.dismiss();
                        return [4 /*yield*/, this.ionViewWillEnter()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        loading.dismiss();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //#endregion
    // #region Abrir Camera
    CuentaPage.prototype.openCamera = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var optionsCamera;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        optionsCamera = {
                            quality: 60,
                            destinationType: this.camera.DestinationType.FILE_URI,
                            encodingType: this.camera.EncodingType.JPEG,
                            targetWidth: 400,
                            targetHeight: 400,
                            mediaType: this.camera.MediaType.PICTURE,
                            correctOrientation: true,
                            sourceType: this.camera.PictureSourceType.CAMERA,
                        };
                        return [4 /*yield*/, this.getPicture(optionsCamera)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // #endregion
    // #region Abrir Galeria
    CuentaPage.prototype.openGallery = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var optionsGallery;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        optionsGallery = {
                            quality: 60,
                            destinationType: this.camera.DestinationType.FILE_URI,
                            encodingType: this.camera.EncodingType.JPEG,
                            targetWidth: 400,
                            targetHeight: 400,
                            mediaType: this.camera.MediaType.PICTURE,
                            correctOrientation: true,
                            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
                        };
                        return [4 /*yield*/, this.getPicture(optionsGallery)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // #endregion
    // #region Obtener imagen
    CuentaPage.prototype.getPicture = function (options) {
        var _this = this;
        this.camera.getPicture(options).then(function (imageData) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var img, loading, val;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        img = window.Ionic.WebView.convertFileSrc(imageData);
                        return [4 /*yield*/, this.loadCtrl.create({
                                spinner: 'crescent',
                            })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        this.image = img;
                        return [4 /*yield*/, this.cuentaService.updateAvatar(imageData)];
                    case 3:
                        val = _a.sent();
                        if (val) {
                            loading.dismiss();
                            this.ionViewWillEnter();
                        }
                        loading.dismiss();
                        return [2 /*return*/];
                }
            });
        }); }, function (err) {
            // Handle error
        });
    };
    // #endregion
    // #region action sheet
    CuentaPage.prototype.presentActionSheet = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actSheetCtrl.create({
                            header: 'Selecciona una opción',
                            buttons: [
                                {
                                    text: 'Camara',
                                    icon: 'camera',
                                    handler: function () {
                                        _this.openCamera();
                                        console.log('Camara clicked');
                                    }
                                }, {
                                    text: 'Galeria',
                                    icon: 'images',
                                    handler: function () {
                                        _this.openGallery();
                                        console.log('Galeria clicked');
                                    }
                                }
                            ]
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
    CuentaPage = tslib_1.__decorate([
        Component({
            selector: 'app-cuenta',
            templateUrl: './cuenta.page.html',
            styleUrls: ['./cuenta.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [UserService,
            CuentaService,
            LoadingController,
            NavController,
            ActionSheetController,
            Camera,
            UiServiceService])
    ], CuentaPage);
    return CuentaPage;
}());
export { CuentaPage };
//# sourceMappingURL=cuenta.page.js.map