import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token.service';
import { LOGIN } from '../url-paths';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorsService implements HttpInterceptor {
  constructor(
    private router: Router,
    private tokenService: TokenService,
  ) { }

  getErrorMessage = (error: any) => {
    if (error) {
      return error;
    }
    return 'Oops something went wrong!!!';
  };

  constructURL = (url: string) => environment.baseUrl.concat(url);

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    const token = this.tokenService.getToken();

    let options: any = { url: this.constructURL(request.url) };

    if (token) {
      options = {
        ...options,
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      };
    }

    request = request.clone(options);

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        const isLogin = request.url.includes(LOGIN);

        if (isLogin) {
          return throwError(() => new Error(error.message));
        }

        if (error.status === 401 && error.statusText === 'Unauthorized') {
          this.tokenService.removeToken();

          this.router.navigate(['login']).then((_) => console.log('redirect to login'));
        }

        // this.snackBar.open(this.getErrorMessage(error.statusText), '', {
        //   verticalPosition: 'bottom',
        //   horizontalPosition: 'center',
        //   panelClass: ['error-snackbar'],
        //   duration: 1000,
        // });

        return throwError(() => new Error(error.message));
      }),
    );
  }
}
