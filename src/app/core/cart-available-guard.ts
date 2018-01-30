import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class CartAvailableGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let canAccess = this.user.checkFeature('cart');
    if (!canAccess) {
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    }
    return canAccess;
  }
}
