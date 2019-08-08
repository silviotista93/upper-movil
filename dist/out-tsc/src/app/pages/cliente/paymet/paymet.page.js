import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { NavController, IonSlides } from '@ionic/angular';
var PaymetPage = /** @class */ (function () {
    function PaymetPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    PaymetPage.prototype.ngOnInit = function () {
    };
    PaymetPage.prototype.atras = function () {
        this.navCtrl.back();
    };
    // Initialize slider
    PaymetPage.prototype.ionViewDidEnter = function () {
        this.slideChanged();
    };
    // On segment click
    PaymetPage.prototype.selectedTab = function (index) {
        this.slider.slideTo(index);
        console.log('selectedTab', index);
    };
    // On slide changed
    PaymetPage.prototype.slideChanged = function () {
        var currentIndex = this.slider.getActiveIndex();
        var slides_count = this.segments.nativeElement.childElementCount;
        this.page = currentIndex.toString();
        if (this.page >= slides_count) {
            this.page = (slides_count - 1).toString();
        }
        console.log('slides_count', slides_count);
        console.log('this.page', this.page);
        this.centerScroll();
    };
    // Center current scroll
    PaymetPage.prototype.centerScroll = function () {
        if (!this.segments || !this.segments.nativeElement) {
            return;
        }
        var sizeLeft = this.sizeLeft();
        var sizeCurrent = this.segments.nativeElement.children[this.page].clientWidth;
        var result = sizeLeft - (window.innerWidth / 2) + (sizeCurrent / 2);
        result = (result > 0) ? result : 0;
        this.smoothScrollTo(result);
    };
    // Get size start to current
    PaymetPage.prototype.sizeLeft = function () {
        var size = 0;
        for (var i = 0; i < this.page; i++) {
            size += this.segments.nativeElement.children[i].clientWidth;
        }
        return size;
    };
    // Easing function
    PaymetPage.prototype.easeInOutQuart = function (time, from, distance, duration) {
        if ((time /= duration / 2) < 1) {
            return distance / 2 * time * time * time * time + from;
        }
        return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };
    // Animate scroll
    PaymetPage.prototype.smoothScrollTo = function (endX) {
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
        ViewChild('slider'),
        tslib_1.__metadata("design:type", IonSlides)
    ], PaymetPage.prototype, "slider", void 0);
    tslib_1.__decorate([
        ViewChild('segments'),
        tslib_1.__metadata("design:type", Object)
    ], PaymetPage.prototype, "segments", void 0);
    PaymetPage = tslib_1.__decorate([
        Component({
            selector: 'app-paymet',
            templateUrl: './paymet.page.html',
            styleUrls: ['./paymet.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController])
    ], PaymetPage);
    return PaymetPage;
}());
export { PaymetPage };
//# sourceMappingURL=paymet.page.js.map