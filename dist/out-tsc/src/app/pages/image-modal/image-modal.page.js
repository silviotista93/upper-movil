import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
var ImageModalPage = /** @class */ (function () {
    function ImageModalPage(navParams, modalController) {
        this.navParams = navParams;
        this.modalController = modalController;
        this.sliderOpts = {
            zoom: {
                maxRatio: 3
            }
        };
    }
    ImageModalPage.prototype.ngOnInit = function () {
        this.img = this.navParams.get('img');
    };
    ImageModalPage.prototype.zoom = function (zoomIn) {
        var zoom = this.slider.nativeElement.swiper.zoom;
        if (zoomIn) {
            zoom.in();
        }
        else {
            zoom.out();
        }
    };
    ImageModalPage.prototype.close = function () {
        this.modalController.dismiss();
    };
    tslib_1.__decorate([
        ViewChild('slider', { read: ElementRef }),
        tslib_1.__metadata("design:type", ElementRef)
    ], ImageModalPage.prototype, "slider", void 0);
    ImageModalPage = tslib_1.__decorate([
        Component({
            selector: 'app-image-modal',
            templateUrl: './image-modal.page.html',
            styleUrls: ['./image-modal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavParams, ModalController])
    ], ImageModalPage);
    return ImageModalPage;
}());
export { ImageModalPage };
//# sourceMappingURL=image-modal.page.js.map