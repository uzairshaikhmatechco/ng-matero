import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, iif, map, merge, of, share, switchMap, tap } from 'rxjs';
import { filterObject, isEmptyObject } from './helpers';
import { User } from './interface';
import { LoginService } from './login.service';
import { TokenService } from './token.service';
import { de } from 'date-fns/locale';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginService = inject(LoginService);
  private readonly tokenService = inject(TokenService);

  private user$ = new BehaviorSubject<User>({});
  private change$ = merge(
    this.tokenService.change(),
    this.tokenService.refresh().pipe(switchMap(() => this.refresh()))
  ).pipe(
    switchMap(() => this.assignUser()),
    share()
  );

  init() {
    return new Promise<void>(resolve => this.change$.subscribe(() => resolve()));
  }

  change() {
    return this.change$;
  }

  check() {
    return this.tokenService.valid();
  }


  login1(username: string, password: string, rememberMe = false) {
    return this.loginService.login(username, password, rememberMe).pipe(
      tap(token => this.tokenService.set(token)),
      map(() => this.check())
    );
  }

  login(username: string, password: string, rememberMe = false) {
  const payload = {
    Email: username,      // map username to Email
    Password: password,   // map password to Password
    RememberMe: rememberMe
  };

  return this.loginService.loginPayload(payload).pipe(
    tap(token => this.tokenService.set(token)),
    map(() => this.check())
  );
}

  refresh() {

console.log("Refreshing token... + this.tokenService.getRefreshToken()");

    return this.loginService
      .refresh(filterObject({ refreshToken: this.tokenService.getRefreshToken() }) as {
        refreshToken: string;
      })
      .pipe(
        catchError(() => of(undefined)),
        tap(token => this.tokenService.set(token)),
        map(() => this.check())
      );
  }

  logout1() {
    return this.loginService.logout().pipe(
      tap(() => this.tokenService.clear()),
      map(() => !this.check())
    );
  }


logout() {
  console.log("logout");
  const refreshToken = this.tokenService.getRefreshToken();

  if (!refreshToken) {
    console.log("No refresh token found. Clearing local auth state.");
    this.tokenService.clear();
    return of(true); // return observable so caller doesn’t break
  }

  return this.loginService.logout(refreshToken).pipe(
    tap({
      next: () => {
        this.tokenService.clear();
        console.log("Logged out successfully.");
      },
      error: (err) => {
        console.log("Logout failed:", err);
        this.tokenService.clear(); // still clear local tokens
      }
    }),
    map(() => !this.check()),
    catchError(() => of(true)) // fallback: always resolve to true to prevent app crash
  );
}




  user() {
    return this.user$.pipe(share());
  }

  menu() {
    return iif(() => this.check(), this.loginService.menu(), of([]));
  }

  private assignUser() {
    if (!this.check()) {
      return of({}).pipe(tap(user => this.user$.next(user)));
    }

    if (!isEmptyObject(this.user$.getValue())) {
      return of(this.user$.getValue());
    }

    return this.loginService.user().pipe(tap(user => this.user$.next(user)));
  }
}
