import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { Menu } from '@core';
import { Token, User } from './interface';
import { ApiResponse } from 'Wrappers/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  protected readonly http = inject(HttpClient);

  login(username: string, password: string, rememberMe = false) {
    return this.http.post<Token>('/api/Account/Authentication', { username, password, rememberMe });
  }

  loginPayload2(payload: { Email: string; Password: string; RememberMe: boolean }) {
    return this.http.post<Token>('/api/Account/Authentication', payload);
  }

 loginPayload(payload: { Email: string; Password: string; RememberMe: boolean }): Observable<Token> {
    return this.http.post<ApiResponse<any>>('/api/v1/account/authentication', payload).pipe(
      map((res: ApiResponse<any>) => {
        console.log('Login Response:', res);
        debugger;
        if (!res.succeeded) {
          throw new Error(res.message || 'Login failed');
        }

        const data = res.data;

        const token: Token = {
          access_token: data.access_Token,
          token_type: data.token_Type,
          expires_in: data.expires_In,
          exp: data.exp,
          refresh_token: data.refresh_Token
        };

        return token;
      })
    );
  }

  refresh(params: Record<string, any>) {
    debugger;
    return this.http.post<Token>('/api/v1/account/refresh-token', params);
  }

  logout1() {
    return this.http.post<any>('/api/v1/account/logout', {});
  }

  logout(refreshToken?: string) {
    return this.http.post<any>('/api/v1/account/logout', { refreshToken: refreshToken });
  }

  user() {
    return this.http.get<User>('/api/v1/admin/user');
  }

  menu() {
    return this.http.get<{ menu: Menu[] }>('/api/v1/menus').pipe(map(res => res.menu));
  }
}
