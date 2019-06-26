import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, navCtrl) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.navCtrl = navCtrl;
        this.appPages = [
            {
                title: 'Solicitar Servicio',
                url: '/home',
                icon: 'home'
            },
            {
                title: 'Subscripciones',
                url: '/subscripcion',
                icon: 'subscripcion'
            },
            {
                title: 'Historial',
                url: '/historial',
                icon: 'historial'
            },
            {
                title: 'Mis Autos',
                url: '/autos',
                icon: 'autos'
            },
            {
                title: 'Contacto',
                url: '/contacto',
                icon: 'contacto'
            },
        ];
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleLightContent();
            _this.splashScreen.hide();
        });
    };
    AppComponent.prototype.pushPerfil = function () {
        this.navCtrl.navigateForward('/cuenta');
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            NavController])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map