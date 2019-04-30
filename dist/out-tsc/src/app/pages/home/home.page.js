import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController, MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
var HomePage = /** @class */ (function () {
    function HomePage(geolocation, alertController, menu, loadCtrl) {
        this.geolocation = geolocation;
        this.alertController = alertController;
        this.menu = menu;
        this.loadCtrl = loadCtrl;
        this.mapRef = null;
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.menu.enable(true);
        setTimeout(function () {
            _this.loadMap();
        }, 500);
    };
    HomePage.prototype.loadMap = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading, rta;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadCtrl.create({
                            spinner: 'crescent'
                        })];
                    case 1:
                        loading = _a.sent();
                        loading.present();
                        this.geolocation.getCurrentPosition().then(function (resp) {
                            var myLatLng = {
                                lat: resp.coords.latitude,
                                lng: resp.coords.longitude
                            };
                            console.log(myLatLng);
                            var mapEle = document.getElementById('map');
                            _this.mapRef = new google.maps.Map(mapEle, {
                                center: myLatLng,
                                zoom: 18,
                                disableDefaultUI: true
                            });
                            google.maps.event.addListenerOnce(_this.mapRef, 'idle', function () {
                                loading.dismiss();
                                _this.addMarker(resp.coords.latitude, resp.coords.longitude);
                            });
                        }).catch(function (error) {
                            console.log('Error getting location', error);
                        });
                        rta = this.geolocation.getCurrentPosition();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.ubicacionActual = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            var myLatLng = {
                lat: resp.coords.latitude,
                lng: resp.coords.longitude
            };
            console.log(myLatLng);
            var mapEle = document.getElementById('map');
            _this.mapRef = new google.maps.Map(mapEle, {
                center: myLatLng,
                zoom: 18,
                disableDefaultUI: true
            });
            google.maps.event.addListenerOnce(_this.mapRef, 'idle', function () {
                _this.addMarker(resp.coords.latitude, resp.coords.longitude);
            });
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    HomePage.prototype.addMarker = function (lat, lng) {
        var image = '/assets/iconos/ubicacion.png';
        var marker = new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: this.mapRef,
            icon: image,
            animation: google.maps.Animation.BOUNCE,
            title: 'Ubicación Actual'
        });
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Geolocation,
            AlertController,
            MenuController,
            LoadingController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map