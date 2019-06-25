import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var AgregarAutoPage = /** @class */ (function () {
    function AgregarAutoPage() {
        this.tipo_vehiculo = [
            {
                img: 'automovil.png',
                seleccionado: true
            },
            {
                img: 'campero.png',
                seleccionado: false
            },
            {
                img: 'camioneta.png',
                seleccionado: false
            },
            {
                img: 'motocarro.png',
                seleccionado: false
            },
            {
                img: 'cuatrimoto.png',
                seleccionado: false
            },
            {
                img: 'microbus.png',
                seleccionado: false
            },
        ];
        this.colores = [
            {
                img: 'amarillo.png',
                seleccionado: true
            },
            {
                img: 'azul_bandera.png',
                seleccionado: false
            },
            {
                img: 'azul.png',
                seleccionado: false
            },
            {
                img: 'blanco.png',
                seleccionado: false
            },
            {
                img: 'morado.png',
                seleccionado: false
            },
            {
                img: 'naranja.png',
                seleccionado: false
            },
            {
                img: 'negro.png',
                seleccionado: false
            },
            {
                img: 'rojo.png',
                seleccionado: false
            },
            {
                img: 'verde.png',
                seleccionado: false
            },
        ];
        this.tipoVehiculoSlides = {
            slidesPerView: 3.5
        };
        this.colorSlides = {
            slidesPerView: 6.0
        };
    }
    AgregarAutoPage.prototype.ngOnInit = function () {
    };
    AgregarAutoPage.prototype.seleccionado_tipo_vehiculo = function (vehiculos) {
        this.tipo_vehiculo.forEach(function (img) { return img.seleccionado = false; });
        vehiculos.seleccionado = true;
    };
    AgregarAutoPage.prototype.seleccionado_color = function (color) {
        this.colores.forEach(function (img) { return img.seleccionado = false; });
        color.seleccionado = true;
    };
    AgregarAutoPage = tslib_1.__decorate([
        Component({
            selector: 'app-agregar-auto',
            templateUrl: './agregar-auto.page.html',
            styleUrls: ['./agregar-auto.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], AgregarAutoPage);
    return AgregarAutoPage;
}());
export { AgregarAutoPage };
//# sourceMappingURL=agregar-auto.page.js.map