import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as moment from 'moment';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(@Inject('LocalStorage') localStorage, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url): boolean {
    const auth = localStorage.getItem('authData');

    if (!auth) {
      this.router.navigate(['/login']);
      return false;
    }

    const authObj = JSON.parse(auth);
    if (!authObj) {
      return false;
    }

    const now = moment();
    const tokenData = moment(authObj.expires_in);

    if (now.diff(tokenData, 'seconds') > 0) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
