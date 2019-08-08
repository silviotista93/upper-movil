import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, Events } from '@ionic/angular';
import { UiServiceService } from '../../service/ui-service.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/service/cliente/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NgZone } from '@angular/core';
var MenuComponent = /** @class */ (function () {
    function MenuComponent(events, navCtrl, uiServ, http, storage, zone, userService) {
        var _this = this;
        this.events = events;
        this.navCtrl = navCtrl;
        this.uiServ = uiServ;
        this.http = http;
        this.storage = storage;
        this.zone = zone;
        this.userService = userService;
        this.URL = environment.url;
        this.usuario = {};
        this.rolesUsuario = {};
        this.tokenService = null;
        this.events.subscribe('updateScreen', function () {
            _this.zone.run(function () {
                console.log('force update the screen');
            });
        });
    }
    MenuComponent.prototype.pushPerfil = function () {
        this.navCtrl.navigateForward('/cuenta');
    };
    MenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.usuario = this.userService.getUsuario();
        // console.log('usuario menu', this.usuario);
        this.componentMenu = this.uiServ.getMenuOptions();
        this.storage.get('token').then(function (res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var headerToken;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                console.log(res);
                this.tokenService = res;
                headerToken = new HttpHeaders({
                    'Authorization': this.tokenService,
                });
                this.http.get(this.URL + "/api/auth/user", { headers: headerToken })
                    .subscribe(function (resp) {
                    _this.usuario = resp['user'];
                    return _this.usuario;
                });
                return [2 /*return*/, this.tokenService];
            });
        }); });
        this.storage.get('token').then(function (res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var headerToken;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.tokenService = res;
                headerToken = new HttpHeaders({
                    'Authorization': this.tokenService,
                });
                this.http.get(this.URL + "/api/auth/user-roles", { headers: headerToken })
                    .subscribe(function (resp) {
                    console.log(resp);
                    _this.rolesUsuario = resp['roles'];
                    console.log('id rol', _this.rolesUsuario.id);
                    return _this.rolesUsuario;
                });
                return [2 /*return*/, this.tokenService];
            });
        }); });
    };
    MenuComponent = tslib_1.__decorate([
        Component({
            selector: 'app-menu',
            templateUrl: './menu.component.html',
            styleUrls: ['./menu.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Events,
            NavController,
            UiServiceService,
            HttpClient,
            Storage,
            NgZone,
            UserService])
    ], MenuComponent);
    return MenuComponent;
}());
export { MenuComponent };
//# sourceMappingURL=menu.component.js.map