import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageModalPage } from '../image-modal/image-modal.page';
var DetalleLavadoPage = /** @class */ (function () {
    function DetalleLavadoPage(modalController) {
        this.modalController = modalController;
        this.sliderOpts = {
            zoom: false,
            slidesPerView: 1.2,
            spaceBetween: 20,
            centeredSlides: true
        };
        this.oculto = 30;
    }
    DetalleLavadoPage.prototype.ngOnInit = function () {
    };
    DetalleLavadoPage.prototype.openPreview = function (img) {
        this.modalController.create({
            component: ImageModalPage,
            componentProps: {
                img: img
            }
        }).then(function (modal) { return modal.present(); });
    };
    DetalleLavadoPage = tslib_1.__decorate([
        Component({
            selector: 'app-detalle-lavado',
            templateUrl: './detalle-lavado.page.html',
            styleUrls: ['./detalle-lavado.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController])
    ], DetalleLavadoPage);
    return DetalleLavadoPage;
}());
export { DetalleLavadoPage };
//# sourceMappingURL=detalle-lavado.page.js.map