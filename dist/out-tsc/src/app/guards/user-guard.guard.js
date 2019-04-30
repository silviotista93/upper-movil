import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { UserService } from '../service/user.service';
var UserGuardGuard = /** @class */ (function () {
    function UserGuardGuard(userService) {
        this.userService = userService;
    }
    UserGuardGuard.prototype.canLoad = function () {
        return this.userService.validaToken();
    };
    UserGuardGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [UserService])
    ], UserGuardGuard);
    return UserGuardGuard;
}());
export { UserGuardGuard };
//# sourceMappingURL=user-guard.guard.js.map