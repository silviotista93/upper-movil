import * as tslib_1 from "tslib";
import { Component, EventEmitter } from '@angular/core';
import { CarService } from '../../../service/cliente/car.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { LoadingController, ActionSheetController } from '@ionic/angular';
var EditarAutoPage = /** @class */ (function () {
    function EditarAutoPage(carService, loadCtrl, camera, actSheetCtrl, route) {
        this.carService = carService;
        this.loadCtrl = loadCtrl;
        this.camera = camera;
        this.actSheetCtrl = actSheetCtrl;
        this.route = route;
        //#region Slides per view
        this.slidesCar = {
            slidesPerView: 3.5,
            spaceBetween: 2
        };
        this.slidesColor = {
            slidesPerView: 6.0
        };
        //#endregion
        this.URL = environment.url;
        this.brands = [];
        this.colors = [];
        this.carTypes = [];
        this.cilindrajes = [];
        this.car = {};
        // #region Variables string
        this.avatarSel = new EventEmitter();
        this.image2 = "../assets/banner_add_auto.png";
        //#endregion
        this.id = this.route.snapshot.paramMap.get('id');
    }
    EditarAutoPage.prototype.ngOnInit = function () {
    };
    EditarAutoPage.prototype.ionViewWillEnter = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadDataCar()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // #region Cargar Datos del auto
    EditarAutoPage.prototype.loadData = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.carService.getCar(this.id).subscribe(function (resp) {
                    _this.car = resp['car'];
                    _this.image = _this.car.picture;
                    _this.image2 = "";
                });
                return [2 /*return*/];
            });
        });
    };
    // #endregion
    // #region Cargar Marcas, Colores y Tipos 
    EditarAutoPage.prototype.loadDataCar = function () {
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
                            for (var _i = 0, _b = _this.brands; _i < _b.length; _i++) {
                                var brand = _b[_i];
                                if (brand.id === _this.car.brand_id) {
                                    _this.brandSel = brand.name;
                                    break;
                                }
                            }
                        });
                        this.carService.getColor().subscribe(function (resp) {
                            var _a;
                            (_a = _this.colors).push.apply(_a, resp['colors']);
                            loading.dismiss();
                            for (var _i = 0, _b = _this.colors; _i < _b.length; _i++) {
                                var color = _b[_i];
                                if (color.id === _this.car.color_id) {
                                    _this.colorSel = color.picture;
                                    break;
                                }
                            }
                        });
                        this.carService.getCarType().subscribe(function (resp) {
                            var _a;
                            (_a = _this.carTypes).push.apply(_a, resp['carTypes']);
                            loading.dismiss();
                            for (var _i = 0, _b = _this.carTypes; _i < _b.length; _i++) {
                                var type = _b[_i];
                                if (type.id === _this.car.car_type_id) {
                                    _this.carSel = type.picture;
                                    break;
                                }
                            }
                        });
                        this.carService.getCilindraje().subscribe(function (resp) {
                            var _a;
                            (_a = _this.cilindrajes).push.apply(_a, resp['cilindrajes']);
                            loading.dismiss();
                            for (var _i = 0, _b = _this.cilindrajes; _i < _b.length; _i++) {
                                var cilin = _b[_i];
                                if (cilin.id === _this.car.cilindraje_id) {
                                    _this.cilindrajeSel = cilin.picture;
                                    break;
                                }
                            }
                        });
                        loading.dismiss();
                        return [2 /*return*/];
                }
            });
        });
    };
    // #endregion
    // #region Metodos clic
    EditarAutoPage.prototype.selectedBrand = function (brand) {
        this.avatarSel.emit(brand.id);
        this.brandId = brand.id;
    };
    EditarAutoPage.prototype.selectedCar = function (carTypes) {
        this.carSel = carTypes.picture;
        this.avatarSel.emit(carTypes.picture);
        this.carId = carTypes.id.toString();
        this.car.car_type_id = this.carId;
    };
    EditarAutoPage.prototype.selectedCilindraje = function (cilindrajes) {
        this.cilindrajeSel = cilindrajes.picture;
        this.avatarSel.emit(cilindrajes.picture);
        this.cilindrajeId = cilindrajes.id.toString();
        this.car.cilindraje_id = this.cilindrajeId;
    };
    EditarAutoPage.prototype.selectedColor = function (colors) {
        this.colorSel = colors.picture;
        this.avatarSel.emit(colors.picture);
        this.colorId = colors.id.toString();
        this.car.color_id = this.colorId;
    };
    // #endregion
    // #region Actulizar carro
    EditarAutoPage.prototype.saveCar = function (car) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var validated;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('data', this.car);
                        return [4 /*yield*/, this.carService.updatePicture(this.imageToUpload, this.id)];
                    case 1:
                        _a.sent();
                        this.car.picture = this.carService.image;
                        return [4 /*yield*/, this.carService.updateCar(car)];
                    case 2:
                        validated = _a.sent();
                        if (validated) {
                            this.carService.image = "";
                            this.car = {};
                            this.ionViewWillEnter();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // #endregion
    // #region Abrir Camera
    EditarAutoPage.prototype.openCamera = function () {
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
    EditarAutoPage.prototype.openGallery = function () {
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
    EditarAutoPage.prototype.getPicture = function (options) {
        var _this = this;
        this.camera.getPicture(options).then(function (imageData) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var img, loading;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.imageToUpload = imageData;
                        img = window.Ionic.WebView.convertFileSrc(imageData);
                        return [4 /*yield*/, this.loadCtrl.create({
                                spinner: 'crescent',
                            })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        this.image2 = img;
                        this.image = "";
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
    EditarAutoPage.prototype.presentActionSheet = function () {
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
    EditarAutoPage = tslib_1.__decorate([
        Component({
            selector: 'app-editar-auto',
            templateUrl: './editar-auto.page.html',
            styleUrls: ['./editar-auto.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [CarService,
            LoadingController,
            Camera,
            ActionSheetController,
            ActivatedRoute])
    ], EditarAutoPage);
    return EditarAutoPage;
}());
export { EditarAutoPage };
//# sourceMappingURL=editar-auto.page.js.map