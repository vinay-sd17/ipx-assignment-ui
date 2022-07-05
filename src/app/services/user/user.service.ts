import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

import { LOGIN, GET_USER_PROFILE } from '../url-paths';
import { USER } from 'src/app/models/common.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private restService: HttpClient, private tokenService: TokenService) { }

  login = (loginData: any): Observable<any> => {
    const authData = `${loginData.username}:${loginData.password}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(authData)}`
    });

    this.tokenService.removeToken();

    return this.restService.post(LOGIN, null, { headers }).pipe(
      tap((res: any) => {
        this.tokenService.saveToken(res.access_token);
      }),
    );
  };

  getUserProfile = (): Observable<any> =>
    new Observable((observe) => {
      this.restService.get(GET_USER_PROFILE).subscribe({
        next: (res: any) => observe.next(res),
        error: (err: any) => {
          console.log(err);

          // Passing mock value in error
          const user: USER = {
            firstName: 'Goutham Vinith',
            lastName: 'S',
            userId: 'gvinith',
          };

          observe.next(user);
        },
      });
    });

  logout = (): void => {
    this.tokenService.removeToken();
  };
}
