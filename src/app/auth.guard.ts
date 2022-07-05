import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { TokenService } from 'src/app/services/token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;

    return this.checkToken(url);
  }

  checkToken(url: string): boolean {
    const accessToken = this.tokenService.getToken();

    if (accessToken && url === '/login') {
      this.router.navigate(['/products']);
      return false;
    }

    if (!accessToken && url === '/login') {
      return true;
    }

    if (accessToken) {
      return true;
    }

    this.router.navigate(['/']);

    return false;
  }
}
