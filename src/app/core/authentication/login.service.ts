import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { Menu } from '@core';
import { Token, User } from './interface';
import { ApiResponse } from 'Wrappers/ApiResponse';

interface AuthTokenResponse {
  access_Token: string;
  token_Type: string;
  expires_In: number;
  exp: number;
  refresh_Token: string;
}

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
    return this.http
      .post<ApiResponse<AuthTokenResponse>>('/api/v1/account/authentication', payload)
      .pipe(
        map((res: ApiResponse<AuthTokenResponse>) => {
        if (!res.succeeded) {
          throw new Error(res.message || 'Login failed');
        }

        const data = res.data;
        if (!data) {
          throw new Error('Login response is missing token data');
        }

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

  refresh(params: { refreshToken: string }): Observable<Token> {
    return this.http
      .post<ApiResponse<AuthTokenResponse>>('/api/v1/account/refresh-token', params)
      .pipe(
        map((res: ApiResponse<AuthTokenResponse>) => {
          if (!res.succeeded) {
            throw new Error(res.message || 'Refresh failed');
          }

          const data = res.data;
          if (!data) {
            throw new Error('Refresh response is missing token data');
          }

          return {
            access_token: data.access_Token,
            token_type: data.token_Type,
            expires_in: data.expires_In,
            exp: data.exp,
            refresh_token: data.refresh_Token,
          };
        })
      );
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
