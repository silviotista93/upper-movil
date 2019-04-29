import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanLoad {

    constructor ( private userService: UserService) {}
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.validaToken();
  }
}
