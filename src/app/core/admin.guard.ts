
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';



@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.user.loggedIn){
      let canAccess = this.user.checkPermission('admin');
      if (!canAccess) {
        this.router.navigate(['auth-required']);
      }
      return canAccess;
    }
    else {
      this.router.navigate(['auth'], { queryParams: { returnUrl: state.url }});
    }
  }
}
