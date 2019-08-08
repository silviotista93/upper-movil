import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ModalController, LoadingController, NavController } from '@ionic/angular';
import { OrderService } from '../../../service/cliente/order.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UiServiceService } from '../../../service/ui-service.service';
import { UserService } from '../../../service/cliente/user.service';
var ModalConfirmarSolicitudPage = /** @class */ (function () {
    function ModalConfirmarSolicitudPage(modalCtrl, orderService, loadCtrl, geolocation, navCtrl, uiService, userService) {
        this.modalCtrl = modalCtrl;
        this.orderService = orderService;
        this.loadCtrl = loadCtrl;
        this.geolocation = geolocation;
        this.navCtrl = navCtrl;
        this.uiService = uiService;
        this.userService = userService;
        this.sliderConfig = {
            spaceBetween: 20,
            centeredSlides: false,
            slidesPerView: 1.2
        };
        this.dataPlanCar = [];
        // public typeWash: Type_Wash[] = [];
        this.typeWash = { seleccionado: false };
        this.dataTypeWash = [];
        this.id = [];
        this.idUser = [];
        this.usuario = {};
        this.order = {};
    }
    ModalConfirmarSolicitudPage.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.dataPlanCar = this.nombre;
                        console.log(this.dataPlanCar);
                        this.typeWash = this.dataPlanCar[0].subscription[0].plans.wash_type;
                        _a = this;
                        return [4 /*yield*/, this.userService.getUsuario()];
                    case 1:
                        _a.usuario = _b.sent();
                        this.idUser = this.usuario.id;
                        console.log('suscripcion', this.dataPlanCar[0].subscription);
                        console.log('tipos lavados', this.typeWash);
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalConfirmarSolicitudPage.prototype.cerrar_modal = function () {
        this.modalCtrl.dismiss();
    };
    ModalConfirmarSolicitudPage.prototype.info_type_wash = function (typeWash) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var id2_1, pos;
            return tslib_1.__generator(this, function (_a) {
                //  await this.desmarcarSeleccionado(typeWash);
                if (typeWash.seleccionado) {
                    typeWash.seleccionado = false;
                    id2_1 = typeWash.id;
                    pos = this.dataTypeWash.findIndex(function (i) { return i.id === id2_1; });
                    console.log('id', pos);
                    this.dataTypeWash = this.dataTypeWash.slice(0, pos)
                        .concat(this.dataTypeWash.slice(pos + 1, this.dataTypeWash.length));
                    this.id = this.id.slice(0, pos)
                        .concat(this.id.slice(pos + 1, this.id.length));
                    console.log('desclikeado', this.id);
                    console.log('idArreglo', this.id);
                    return [2 /*return*/];
                }
                typeWash.seleccionado = true;
                this.dataTypeWash.push(typeWash);
                this.id.push(typeWash.id);
                console.log('clikeado', this.dataTypeWash);
                console.log('idArreglo', this.id);
                return [2 /*return*/];
            });
        });
    };
    //  private async desmarcarSeleccionado (washSelecc: Type_Wash) {
    //    for ( const typeWash of this.typeWash) {
    //        if ( typeWash.type !== washSelecc.type) {
    //          typeWash.seleccionado = false;
    //          this.dataTypeWash.pop();
    //        }
    //    }
    //  }
    ModalConfirmarSolicitudPage.prototype.registrarOrden = function () {
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
                            _this.order = {
                                latitude: myLatLng.lat,
                                longitude: myLatLng.lng,
                                subscription: _this.dataPlanCar[0].subscription[0].id,
                                address: 'Rincon de Yambitara 2 Etapa',
                                typesWash: _this.id,
                                // spivot: this.dataTypeWash.pivot,
                                user_id: _this.idUser,
                            };
                            console.log(_this.order);
                            var validated = _this.orderService.createOrder(_this.order);
                            if (validated) {
                                //   NAVEGA A LA PAGINA PRINCIPAL
                                loading.dismiss();
                                _this.cerrar_modal();
                                _this.navCtrl.navigateForward('/menu/historial');
                                _this.uiService.successToast('Tu solicitud ha sido creada');
                            }
                            else {
                                //  MUESTRA ALERTA DE ERROR EN INICIO DE SESION
                            }
                        }).catch(function (error) {
                            console.log('Error getting location', error);
                        });
                        rta = this.geolocation.getCurrentPosition();
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ModalConfirmarSolicitudPage.prototype, "nombre", void 0);
    ModalConfirmarSolicitudPage = tslib_1.__decorate([
        Component({
            selector: 'app-modal-confirmar-solicitud',
            templateUrl: './modal-confirmar-solicitud.page.html',
            styleUrls: ['./modal-confirmar-solicitud.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            OrderService,
            LoadingController,
            Geolocation,
            NavController,
            UiServiceService,
            UserService])
    ], ModalConfirmarSolicitudPage);
    return ModalConfirmarSolicitudPage;
}());
export { ModalConfirmarSolicitudPage };
//# sourceMappingURL=modal-confirmar-solicitud.page.js.map