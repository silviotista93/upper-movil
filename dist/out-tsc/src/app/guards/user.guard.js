import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { UserService } from '../service/cliente/user.service';
var UserGuard = /** @class */ (function () {
    function UserGuard(userService) {
        this.userService = userService;
    }
    UserGuard.prototype.canLoad = function () {
        return this.userService.validaToken();
    };
    UserGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [UserService])
    ], UserGuard);
    return UserGuard;
}());
export { UserGuard };
//# sourceMappingURL=user.guard.js.map