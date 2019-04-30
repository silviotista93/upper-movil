import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
var SubscripcionPage = /** @class */ (function () {
    function SubscripcionPage(userService) {
        this.userService = userService;
        this.usuario = {};
    }
    SubscripcionPage.prototype.ngOnInit = function () {
        this.usuario = this.userService.getUsuario();
        console.log(this.usuario);
    };
    SubscripcionPage = tslib_1.__decorate([
        Component({
            selector: 'app-subscripcion',
            templateUrl: './subscripcion.page.html',
            styleUrls: ['./subscripcion.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [UserService])
    ], SubscripcionPage);
    return SubscripcionPage;
}());
export { SubscripcionPage };
//# sourceMappingURL=subscripcion.page.js.map