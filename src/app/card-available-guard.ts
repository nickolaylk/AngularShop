import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './common/services/user.service';


@Injectable()
export class CardAvailableGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const canAccess = this.user.shoppingCardAvailable;
    if (!canAccess) {
      this.router.navigateByUrl('/');
    }
    return canAccess;
  }
}