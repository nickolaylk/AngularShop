import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './common/services/user.service';


@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const canAccess = this.user.isAdmin;
    if (!canAccess) {
      this.router.navigate(['auth-required']);
    }
    return canAccess;
  }
}