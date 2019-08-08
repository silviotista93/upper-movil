import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController, MenuController, Events, ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/service/cliente/user.service';
import { ModalSolicitarPage } from '../modal-solicitar/modal-solicitar.page';
import { CarService } from '../../../service/cliente/car.service';
import { ModalAlertAgregarAutoPage } from '../modal-alert-agregar-auto/modal-alert-agregar-auto.page';
import { Geocoder, GoogleMaps, LatLng, GoogleMapsAnimation } from '@ionic-native/google-maps/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
var HomePage = /** @class */ (function () {
    function HomePage(events, geolocation, alertController, menu, loadCtrl, userService, modalCtrl, carService, geocoder, nativeGeocoder) {
        this.events = events;
        this.geolocation = geolocation;
        this.alertController = alertController;
        this.menu = menu;
        this.loadCtrl = loadCtrl;
        this.userService = userService;
        this.modalCtrl = modalCtrl;
        this.carService = carService;
        this.geocoder = geocoder;
        this.nativeGeocoder = nativeGeocoder;
        this.mapRef = null;
        this.usuario = {};
        this.cars = [];
        this.geoencoderOptions = {
            useLocale: true,
            maxResults: 3
        };
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.menu.enable(true, 'content');
        setTimeout(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.userService.getUsuario()];
                    case 1:
                        _a.usuario = _b.sent();
                        console.log('Este es el usuario malo', this.usuario);
                        return [4 /*yield*/, this.loadMap()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); }, 500);
    };
    HomePage.prototype.openFirst = function () {
        this.menu.enable(true, 'content');
        this.menu.open('content');
    };
    //#region Logica de mapas
    // async loadMap() {
    //   const loading = await this.loadCtrl.create({
    //     spinner: 'crescent'
    //   });
    //   loading.present();
    //   this.geolocation.getCurrentPosition().then((resp) => {
    //     const myLatLng = {
    //       lat: resp.coords.latitude,
    //       lng: resp.coords.longitude
    //     };
    //     console.log(myLatLng);
    //     const mapEle: HTMLElement = document.getElementById('map');
    //     this.mapRef = new google.maps.Map(mapEle, {
    //       center: myLatLng,
    //       zoom: 18,
    //       disableDefaultUI: true
    //     });
    //     google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
    //       loading.dismiss();
    //       this.addMarker(resp.coords.latitude, resp.coords.longitude);
    //     });
    //   }).catch((error) => {
    //     console.log('Error getting location', error);
    //   });
    //   const rta = this.geolocation.getCurrentPosition();
    // }
    // ubicacionActual() {
    //   this.geolocation.getCurrentPosition().then((resp) => {
    //     const myLatLng = {
    //       lat: resp.coords.latitude,
    //       lng: resp.coords.longitude
    //     };
    //     console.log(myLatLng);
    //     const mapEle: HTMLElement = document.getElementById('map');
    //     this.mapRef = new google.maps.Map(mapEle, {
    //       center: myLatLng,
    //       zoom: 18,
    //       disableDefaultUI: true
    //     });
    //     google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
    //       this.addMarker(resp.coords.latitude, resp.coords.longitude);
    //     });
    //   }).catch((error) => {
    //     console.log('Error getting location', error);
    //   });
    // }
    // private addMarker(lat: number, lng: number) {
    //   const image = '/assets/iconos/ubicacion.png';
    //   const marker = new google.maps.Marker({
    //     position: { lat, lng },
    //     map: this.mapRef,
    //     icon: image,
    //     animation: google.maps.Animation.BOUNCE,
    //     title: 'Ubicación Actual'
    //   });
    // }
    //#endregion
    // #region Cargar Datos
    HomePage.prototype.abrirModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.carService.getCarsPlans().subscribe(function (resp) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var modal, modal;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.cars = resp['cars'];
                                if (!this.cars.length) return [3 /*break*/, 3];
                                return [4 /*yield*/, this.modalCtrl.create({
                                        component: ModalSolicitarPage,
                                        cssClass: '',
                                        componentProps: {
                                            nombre: this.cars
                                        }
                                    })];
                            case 1:
                                modal = _a.sent();
                                return [4 /*yield*/, modal.present()];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 6];
                            case 3: return [4 /*yield*/, this.modalCtrl.create({
                                    component: ModalAlertAgregarAutoPage,
                                    cssClass: 'modal-alert-css',
                                    componentProps: {
                                        nombre: this.cars
                                    },
                                    backdropDismiss: false
                                })];
                            case 4:
                                modal = _a.sent();
                                return [4 /*yield*/, modal.present()];
                            case 5:
                                _a.sent();
                                _a.label = 6;
                            case 6: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    // #endregion
    HomePage.prototype.loadMap = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadCtrl.create({
                            spinner: 'crescent'
                        })];
                    case 1:
                        loading = _a.sent();
                        // loading.present();
                        this.map = GoogleMaps.create('map_canvas');
                        return [4 /*yield*/, this.goToMyLocation()];
                    case 2:
                        _a.sent();
                        loading.dismiss();
                        return [2 /*return*/];
                }
            });
        });
    };
    // #region ir a mi ubicacion
    HomePage.prototype.goToMyLocation = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.map.clear();
                // Get the location of you
                this.map.getMyLocation().then(function (location) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var lat, lng;
                    return tslib_1.__generator(this, function (_a) {
                        console.log(JSON.stringify(location, null, 2));
                        lat = location.latLng.lat;
                        lng = location.latLng.lng;
                        this.addMarker(lat, lng);
                        console.log('lat, lng', lat, lng);
                        return [2 /*return*/];
                    });
                }); })
                    .catch(function (err) {
                    console.log('error', err);
                });
                return [2 /*return*/];
            });
        });
    };
    // #endregion
    // #region AGREGAR MARCADOR
    HomePage.prototype.addMarker = function (lat, lng) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var targ, marker;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.map.clear();
                        targ = { lat: lat, lng: lng };
                        this.map.animateCamera({
                            target: targ,
                            zoom: 19,
                            duration: 3000
                        });
                        marker = this.map.addMarkerSync({
                            position: { lat: lat, lng: lng },
                            // map: this.map,
                            icon: 'red',
                            animation: GoogleMapsAnimation.BOUNCE,
                            title: 'Ubicación Actual'
                        });
                        return [4 /*yield*/, this.doGeocode(marker, lat, lng)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //#endregion
    // #region Obtener direccion
    HomePage.prototype.doGeocode = function (marker, lat, lng) {
        var _this = this;
        var request = {
            position: new LatLng(lat, lng),
        };
        this.geocoder.geocode(request)
            .then(function (results) {
            console.log('localy', results[0]);
            var address = [
                (results[0].thoroughfare || "") + " " + (results[0].subThoroughfare || ", "),
                results[0].locality
            ].join("");
            console.log("data_: ", address);
            _this.city = results[0].locality;
            marker.setTitle(address);
            marker.showInfoWindow();
        });
    };
    // #endregion
    // #region BUSCAR POR DIRECCION
    HomePage.prototype.forwardGeocode = function (keyword) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.nativeGeocoder.forwardGeocode(keyword)
                .then(function (result) {
                var lat = result[0].latitude;
                var lng = result[0].longitude;
                console.log('datasad', result);
                console.log('direccicones', lat, lng);
                _this.addMarker(lat, lng);
                resolve();
            })
                .catch(function (error) {
                console.log(error);
                reject(error);
            });
        });
    };
    // #endregion
    HomePage.prototype.onClick = function () {
        console.log(this.locat);
        var locat2 = this.locat + ' ' + this.city;
        this.forwardGeocode(locat2);
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Events,
            Geolocation,
            AlertController,
            MenuController,
            LoadingController,
            UserService,
            ModalController,
            CarService,
            Geocoder,
            NativeGeocoder])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map