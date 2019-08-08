import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
var ImageSanitizerPipe = /** @class */ (function () {
    function ImageSanitizerPipe(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    ImageSanitizerPipe.prototype.transform = function (img) {
        return this.domSanitizer.bypassSecurityTrustUrl(img);
    };
    ImageSanitizerPipe = tslib_1.__decorate([
        Pipe({
            name: 'imageSanitizer'
        }),
        tslib_1.__metadata("design:paramtypes", [DomSanitizer])
    ], ImageSanitizerPipe);
    return ImageSanitizerPipe;
}());
export { ImageSanitizerPipe };
//# sourceMappingURL=image-sanitizer.pipe.js.map