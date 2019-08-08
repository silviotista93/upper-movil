import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ModalController, IonSegment, IonSlides, LoadingController } from '@ionic/angular';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../service/cliente/order.service';
import { environment } from 'src/environments/environment';
var DetalleLavadoPage = /** @class */ (function () {
    function DetalleLavadoPage(modalController, activatedRoute, orderService, loadCtrl) {
        this.modalController = modalController;
        this.activatedRoute = activatedRoute;
        this.orderService = orderService;
        this.loadCtrl = loadCtrl;
        this.image = this.orderService.image;
        this.idDetalleLavado = null;
        this.opciones = [{
                id: '0',
                opcion: 'Detalle'
            },
            {
                id: '1',
                opcion: 'Facturación'
            }
        ];
        this.URL = environment.url;
        this.orden = {};
        this.car_suscription = {};
        this.car = {};
        this.detailOrden = null;
        this.sliderOpts = {
            zoom: false,
            slidesPerView: 1.2,
            spaceBetween: 20,
            centeredSlides: true
        };
        this.oculto = 30;
    }
    DetalleLavadoPage.prototype.ngOnInit = function () {
        this.idDetalleLavado = this.activatedRoute.snapshot.paramMap.get('id');
        // this.orderService.getDetailOrden(this.idDetalleLavado);
        //   this.orden = this.orderService.order2;
        //   this.orderService.getCarSuscriptionOrden(this.orden.subscription_cars_id);
        //   this.car_suscription = this.orderService.car_suscription2;
        //   console.log('orden', this.orden);
        //   console.log('car_suscription', this.orderService.car_suscription2);
        //   this.car = this.orderService.car_suscription2['car'];
        //   this.image = this.URL + this.car.picture;
        //   console.log('carrossss', this.car);
        //   console.log('carrossss', this.image);   
        this.loadData();
    };
    DetalleLavadoPage.prototype.loadData = function () {
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
                        loading.present();
                        this.orderService.getDetailOrden(this.activatedRoute.snapshot.paramMap.get('id')).then(function (data) {
                            _this.detailOrden = data;
                            console.log('detailorden', _this.detailOrden);
                            setTimeout(function () {
                                _this.selectedTab(_this.opciones[0].id);
                            }, 200);
                        });
                        loading.dismiss();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Initialize slide
    DetalleLavadoPage.prototype.ionViewDidEnter = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.slideChanged();
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // On segment click
    DetalleLavadoPage.prototype.selectedTab = function (index) {
        this.slider.slideTo(index);
        this.segment.value = index;
        console.log('selectedTab', index);
    };
    DetalleLavadoPage.prototype.openPreview = function (img) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: ImageModalPage,
                            componentProps: {
                                img: img
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DetalleLavadoPage.prototype.slideChanged = function () {
        /*
        console.log('ddddd', this.segments.nativeElement);
       console.log(this.segments.nativeElement.childElementCount);
    
        const currentIndex = this.slider.getActiveIndex();
        const slides_count = this.segments.nativeElement.childElementCount;
        
        this.page = currentIndex.toString();
        if (this.page >= slides_count) {
          this.page = (slides_count - 1).toString();
        }
    
        console.log('slides_count', slides_count);
        console.log('this.page', this.page);
        */
        this.centerScroll();
    };
    // Center current scroll
    DetalleLavadoPage.prototype.centerScroll = function () {
        if (!this.segments || !this.segments.nativeElement) {
            return;
        }
        var sizeLeft = this.sizeLeft();
        var sizeCurrent = this.segments.nativeElement.children[this.page].clientWidth;
        var result = sizeLeft - (window.innerWidth / 2) + (sizeCurrent / 2);
        result = (result > 0) ? result : 0;
        this.smoothScrollTo(result);
    };
    DetalleLavadoPage.prototype.sizeLeft = function () {
        var size = 0;
        for (var i = 0; i < this.page; i++) {
            size += this.segments.nativeElement.children[i].clientWidth;
        }
        return size;
    };
    // Easing function
    DetalleLavadoPage.prototype.easeInOutQuart = function (time, from, distance, duration) {
        if ((time /= duration / 2) < 1) {
            return distance / 2 * time * time * time * time + from;
        }
        return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };
    // Animate scroll
    DetalleLavadoPage.prototype.smoothScrollTo = function (endX) {
        var _this = this;
        var startTime = new Date().getTime();
        var startX = this.segments.nativeElement.scrollLeft;
        var distanceX = endX - startX;
        var duration = 400;
        var timer = setInterval(function () {
            var time = new Date().getTime() - startTime;
            var newX = _this.easeInOutQuart(time, startX, distanceX, duration);
            if (time >= duration) {
                clearInterval(timer);
            }
            _this.segments.nativeElement.scrollLeft = newX;
        }, 1000 / 60); // 60 fps
    };
    tslib_1.__decorate([
        ViewChild(IonSegment),
        tslib_1.__metadata("design:type", IonSegment)
    ], DetalleLavadoPage.prototype, "segment", void 0);
    tslib_1.__decorate([
        ViewChild('slider'),
        tslib_1.__metadata("design:type", IonSlides)
    ], DetalleLavadoPage.prototype, "slider", void 0);
    tslib_1.__decorate([
        ViewChild('segments'),
        tslib_1.__metadata("design:type", Object)
    ], DetalleLavadoPage.prototype, "segments", void 0);
    DetalleLavadoPage = tslib_1.__decorate([
        Component({
            selector: 'app-detalle-lavado',
            templateUrl: './detalle-lavado.page.html',
            styleUrls: ['./detalle-lavado.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            ActivatedRoute,
            OrderService,
            LoadingController])
    ], DetalleLavadoPage);
    return DetalleLavadoPage;
}());
export { DetalleLavadoPage };
//# sourceMappingURL=detalle-lavado.page.js.map