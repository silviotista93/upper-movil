import * as tslib_1 from "tslib";
import { Component, EventEmitter } from '@angular/core';
import { CarService } from 'src/app/service/cliente/car.service';
import { UserService } from 'src/app/service/cliente/user.service';
import { environment } from 'src/environments/environment';
import { LoadingController, NavController, ActionSheetController } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { UiServiceService } from 'src/app/service/ui-service.service';
var AgregarAutoPage = /** @class */ (function () {
    function AgregarAutoPage(carService, loadCtrl, navCtrl, userService, uiService, actSheetCtrl, camera) {
        this.carService = carService;
        this.loadCtrl = loadCtrl;
        this.navCtrl = navCtrl;
        this.userService = userService;
        this.uiService = uiService;
        this.actSheetCtrl = actSheetCtrl;
        this.camera = camera;
        //#region Slides per view
        this.slidesCar = {
            slidesPerView: 3.5,
            spaceBetween: 2
        };
        this.slidesColor = {
            slidesPerView: 6.0
        };
        //#endregion
        this.avatarSel = new EventEmitter();
        this.brands = [];
        this.colors = [];
        this.carTypes = [];
        this.cilindrajes = [];
        this.tempImages = [];
        this.user = {};
        this.registerCar = {
            board: '',
            picture: '',
            car_type_id: '',
            cilindraje_id: '',
            brand_id: '',
            color_id: '',
            user_id: ''
        };
        // #region Strings variables
        this.image = "../assets/banner_add_auto.png";
        // #endregion
        this.URL = environment.url;
    }
    AgregarAutoPage.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.userService.getUsuario()];
                    case 1:
                        _a.user = _b.sent();
                        this.registerCar = {};
                        this.loadData();
                        return [2 /*return*/];
                }
            });
        });
    };
    // #region metodos clic 
    AgregarAutoPage.prototype.selectedCar = function (carTypes) {
        this.carSel = carTypes.picture;
        this.avatarSel.emit(carTypes.picture);
        this.carId = carTypes.id.toString();
        // console.log(this.carId);
    };
    AgregarAutoPage.prototype.selectedCilindraje = function (cilindrajes) {
        this.cilindrajeSel = cilindrajes.picture;
        this.avatarSel.emit(cilindrajes.picture);
        this.cilindrajeId = cilindrajes.id.toString();
        // console.log(this.cilindrajeId);
    };
    AgregarAutoPage.prototype.selectedColor = function (colors) {
        this.colorSel = colors.picture;
        this.avatarSel.emit(colors.picture);
        this.colorId = colors.id.toString();
        // console.log(this.colorId);
    };
    AgregarAutoPage.prototype.selectedBrand = function (brand) {
        this.avatarSel.emit(brand.id);
        this.brandId = brand.id;
        console.log("marca", brand.id);
    };
    // #endregion
    // #region Guardar carro
    AgregarAutoPage.prototype.saveCar = function (registerCar) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var validate, val;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.carService.uploadPicture(this.imageToUpload)];
                    case 1:
                        validate = _a.sent();
                        if (!validate) return [3 /*break*/, 3];
                        registerCar.picture = this.carService.image;
                        registerCar.car_type_id = this.carId;
                        registerCar.color_id = this.colorId;
                        registerCar.cilindraje_id = this.cilindrajeId;
                        registerCar.user_id = this.user.id.toString();
                        return [4 /*yield*/, this.carService.createCar(registerCar)];
                    case 2:
                        val = _a.sent();
                        if (val) {
                            this.carService.image = "";
                            this.registerCar = {};
                        }
                        else {
                            this.carService.image = "";
                            this.registerCar = {};
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // #endregion
    // #region Cargar Marcas, Colores y Tipos 
    AgregarAutoPage.prototype.loadData = function () {
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
                        this.carService.getBrand().subscribe(function (resp) {
                            var _a;
                            (_a = _this.brands).push.apply(_a, resp['brands']);
                            loading.dismiss();
                            console.log('brands', _this.brands);
                        });
                        this.carService.getColor().subscribe(function (resp) {
                            var _a;
                            (_a = _this.colors).push.apply(_a, resp['colors']);
                            loading.dismiss();
                            console.log('colors', _this.colors);
                        });
                        this.carService.getCarType().subscribe(function (resp) {
                            var _a;
                            (_a = _this.carTypes).push.apply(_a, resp['carTypes']);
                            loading.dismiss();
                            console.log('types', _this.carTypes);
                        });
                        this.carService.getCilindraje().subscribe(function (resp) {
                            var _a;
                            (_a = _this.cilindrajes).push.apply(_a, resp['cilindrajes']);
                            loading.dismiss();
                            console.log('cilindrajes', _this.cilindrajes);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    // #endregion
    // #region Abrir Camera
    AgregarAutoPage.prototype.openCamera = function () {
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
    AgregarAutoPage.prototype.openGallery = function () {
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
    AgregarAutoPage.prototype.getPicture = function (options) {
        var _this = this;
        this.camera.getPicture(options).then(function (imageData) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var img;
            return tslib_1.__generator(this, function (_a) {
                this.imageToUpload = imageData;
                img = window.Ionic.WebView.convertFileSrc(imageData);
                this.image = img;
                return [2 /*return*/];
            });
        }); }, function (err) {
            // Handle error
        });
    };
    // #endregion
    // #region action sheet
    AgregarAutoPage.prototype.presentActionSheet = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actSheetCtrl.create({
                            header: 'Selecciona una opción',
                            mode: "ios",
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
    // #endregion
    AgregarAutoPage.prototype.back = function () {
        console.log('hizo clic atras');
    };
    AgregarAutoPage = tslib_1.__decorate([
        Component({
            selector: 'app-agregar-auto',
            templateUrl: './agregar-auto.page.html',
            styleUrls: ['./agregar-auto.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [CarService,
            LoadingController,
            NavController,
            UserService,
            UiServiceService,
            ActionSheetController,
            Camera])
    ], AgregarAutoPage);
    return AgregarAutoPage;
}());
export { AgregarAutoPage };
//# sourceMappingURL=agregar-auto.page.js.map