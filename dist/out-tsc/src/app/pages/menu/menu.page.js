import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from 'src/app/service/cliente/user.service';
import { NavController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
var MenuPage = /** @class */ (function () {
    function MenuPage(router, userService, menu, navCtrl) {
        this.router = router;
        this.userService = userService;
        this.menu = menu;
        this.navCtrl = navCtrl;
        this.usuario = {};
        this.URL = environment.url;
        this.pages = [];
        this.selectedPath = '';
    }
    MenuPage.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.userService.getUsuario()];
                    case 1:
                        _a.usuario = _b.sent();
                        this.image = this.usuario.avatar;
                        return [2 /*return*/];
                }
            });
        }); }, 500);
        this.pages = [
            { title: 'Solicitar Servicio', url: '/menu/home', icon: 'home' },
            { title: 'Suscripciones', url: '/menu/subscripcion', icon: 'subscripcion' },
            { title: 'Historial', url: '/menu/historial', icon: 'historial' },
            { title: 'Mis Autos', url: '/menu/autos', icon: 'autos' },
            { title: 'Contacto', url: '/menu/contacto', icon: 'contacto' },
        ];
    };
    MenuPage.prototype.onViewWillEnter = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                setTimeout(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = this;
                                return [4 /*yield*/, this.userService.getUsuario()];
                            case 1:
                                _a.usuario = _b.sent();
                                this.image = this.usuario.avatar;
                                console.log('usuasasasajisas', this.usuario);
                                return [2 /*return*/];
                        }
                    });
                }); }, 500);
                return [2 /*return*/];
            });
        });
    };
    MenuPage.prototype.onClick = function () {
        this.onViewWillEnter();
    };
    MenuPage.prototype.pushPerfil = function () {
        this.navCtrl.navigateForward('/menu/cuenta');
    };
    MenuPage = tslib_1.__decorate([
        Component({
            selector: 'app-menu',
            templateUrl: './menu.page.html',
            styleUrls: ['./menu.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            UserService,
            MenuController,
            NavController])
    ], MenuPage);
    return MenuPage;
}());
export { MenuPage };
//# sourceMappingURL=menu.page.js.map