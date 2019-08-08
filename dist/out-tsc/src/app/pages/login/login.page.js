import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { IonSlides, NavController, MenuController, LoadingController } from '@ionic/angular';
import { UserService } from '../../service/cliente/user.service';
import { UiServiceService } from '../../service/ui-service.service';
import { Facebook } from '@ionic-native/facebook/ngx';
import { HttpClient } from '@angular/common/http';
var LoginPage = /** @class */ (function () {
    function LoginPage(facebook, userService, navCtrl, menu, uiService, httpClient, loadCtrl) {
        this.facebook = facebook;
        this.userService = userService;
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.uiService = uiService;
        this.httpClient = httpClient;
        this.loadCtrl = loadCtrl;
        this.user = {};
        this.userData = {};
        this.loginUser = {
            email: '',
            password: ''
        };
        this.forgotPassword = {
            email: ''
        };
        this.registerUser = {
            email: '',
            names: '',
            last_name: '',
            phone_1: '',
        };
    }
    LoginPage.prototype.ngOnInit = function () {
        this.slides.lockSwipes(true);
        this.menu.enable(false);
    };
    LoginPage.prototype.loginFb = function () {
        var _this = this;
        this.facebook.login(['public_profile', 'email'])
            .then(function (res) {
            if (res.status === 'connected') {
                // console.log(res);
                // this.user.image = 'https://graph.facebook.com/' + res.authResponse.userID + '/picture?type=square';
                _this.getData(res.authResponse.accessToken);
            }
            else {
                alert('login failed');
            }
            console.log('Logged into Facebook!', res);
        })
            .catch(function (e) { return console.log('Error logging into Facebook', e); });
    };
    LoginPage.prototype.getData = function (accessToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading, url;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadCtrl.create({
                            spinner: 'crescent'
                        })];
                    case 1:
                        loading = _a.sent();
                        url = 'https://graph.facebook.com/me?fields=id,name,first_name,last_name,picture.width(720).height(720).as(picture_large),email&access_token=' + accessToken;
                        this.httpClient.get(url).subscribe(function (data) {
                            _this.userData = JSON.stringify(data);
                            console.log('Datos', data);
                            console.log('name', data['name']);
                            _this.usuario = {
                                id: data['id'],
                                email: data['email'],
                                avatar: data['picture_large']['data']['url'],
                                names: data['first_name'],
                                last_name: data['last_name']
                            };
                            console.log(' user', _this.user);
                            var validated = _this.userService.loginFacebook(_this.usuario);
                            console.log('AQUI ESTAMOS MAURICIO');
                            if (validated) {
                                //   NAVEGA A LA PAGINA PRINCIPAL
                                loading.dismiss();
                                _this.navCtrl.navigateRoot('/menu/home', { animated: true });
                                window.location.reload();
                            }
                            else {
                                //  MUESTRA ALERTA DE ERROR EN INICIO DE SESION
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    //#region LOGIN CON FACEBOOK
    LoginPage.prototype.loginWithFB = function () {
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
                        this.facebook.login(['email', 'public_profile']).then(function (response) {
                            _this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', ['public_profile', 'email'])
                                .then(function (profile) {
                                // Datos del Usuario
                                _this.usuario = {
                                    id: profile['id'],
                                    email: profile['email'],
                                    avatar: profile['picture_large']['data']['url'],
                                    names: profile['name']
                                };
                                console.log(_this.usuario);
                                var validated = _this.userService.loginFacebook(_this.usuario);
                                console.log('AQUI ESTAMOS MAURICIO');
                                if (validated) {
                                    //   NAVEGA A LA PAGINA PRINCIPAL
                                    loading.dismiss();
                                    _this.navCtrl.navigateRoot('/menu/home', { animated: true });
                                    window.location.reload();
                                }
                                else {
                                    //  MUESTRA ALERTA DE ERROR EN INICIO DE SESION
                                }
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    //#endregion
    //#region LOGICA DE FORMULARIO LOGIN
    LoginPage.prototype.login = function (fLogin) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading, validated;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(fLogin.valid);
                        return [4 /*yield*/, this.loadCtrl.create({
                                spinner: 'crescent'
                            })];
                    case 1:
                        loading = _a.sent();
                        loading.present();
                        if (fLogin.invalid) {
                            loading.dismiss();
                            this.uiService.errorToast('Todos los campos son obligatorios');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.userService.login(this.loginUser.email, this.loginUser.password)];
                    case 2:
                        validated = _a.sent();
                        if (validated) {
                            //  NAVEGA A LA PAGINA PRINCIPAL
                            loading.dismiss();
                            this.navCtrl.navigateRoot('/menu/home', { animated: true });
                        }
                        else {
                            //  MUESTRA ALERTA DE ERROR EN INICIO DE SESION
                            loading.dismiss();
                            console.log('no hay acceso');
                            this.uiService.errorToast('Usuario y contraseña incorrectas');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //#endregion
    //#region LOGICA DEL FORMULARIO DE REGISTRO
    LoginPage.prototype.registro = function (fRegistro) {
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
                        if (fRegistro.invalid) {
                            loading.dismiss();
                            this.uiService.errorToast('Todos los campos son obligatorios');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.userService.registro(this.registerUser)];
                    case 2:
                        validated = _a.sent();
                        console.log(this.registerUser);
                        if (validated) {
                            loading.dismiss();
                            this.loginUser.email = this.registerUser.email;
                            this.uiService.successToast('Hemos enviado a tu correo constraseña de acceso');
                            this.mostrarLogin();
                        }
                        else {
                            loading.dismiss();
                            this.uiService.errorToast('Correo ya esta en uso');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //#endregion
    //#region LOGICA DEL FORMULARIO DE REGISTRO
    LoginPage.prototype.restaPassword = function (fForPassword) {
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
                        if (fForPassword.invalid) {
                            loading.dismiss();
                            this.uiService.errorToast('El campo email es obligatorio');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.userService.forgotPassword(this.forgotPassword)];
                    case 2:
                        validated = _a.sent();
                        console.log(this.forgotPassword);
                        if (validated) {
                            loading.dismiss();
                            this.loginUser.email = this.forgotPassword.email;
                            this.uiService.successToast('Hemos enviado a tu correo constraseña de acceso');
                            this.mostrarLogin();
                        }
                        else {
                            loading.dismiss();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //#endregion
    // #region Evento de botones
    // EVENTO DE BOTON REGISTRAR
    LoginPage.prototype.mostrarRegistro = function () {
        this.slides.lockSwipes(false);
        this.slides.slideTo(1);
        this.slides.lockSwipes(true);
    };
    // EVENTO DE BOTON LOGIN
    LoginPage.prototype.mostrarLogin = function () {
        this.slides.lockSwipes(false);
        this.slides.slideTo(0);
        this.slides.lockSwipes(true);
    };
    // EVENTO DE BOTON LOGIN
    LoginPage.prototype.mostrarRecuperarPassword = function () {
        this.slides.lockSwipes(false);
        this.slides.slideTo(2);
        this.slides.lockSwipes(true);
    };
    tslib_1.__decorate([
        ViewChild('slidePrincipal'),
        tslib_1.__metadata("design:type", IonSlides)
    ], LoginPage.prototype, "slides", void 0);
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Facebook,
            UserService,
            NavController,
            MenuController,
            UiServiceService,
            HttpClient,
            LoadingController])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map