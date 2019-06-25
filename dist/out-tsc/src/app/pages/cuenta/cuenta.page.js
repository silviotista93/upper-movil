import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { environment } from '../../../environments/environment';
var CuentaPage = /** @class */ (function () {
    function CuentaPage(userService) {
        this.userService = userService;
        this.URL = environment.url;
        this.usuario = {};
    }
    CuentaPage.prototype.ngOnInit = function () {
        this.usuario = this.userService.getUsuario();
        console.log(this.usuario);
    };
    CuentaPage = tslib_1.__decorate([
        Component({
            selector: 'app-cuenta',
            templateUrl: './cuenta.page.html',
            styleUrls: ['./cuenta.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [UserService])
    ], CuentaPage);
    return CuentaPage;
}());
export { CuentaPage };
//# sourceMappingURL=cuenta.page.js.map