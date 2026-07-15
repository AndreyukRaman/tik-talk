import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenResponse } from './auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private baseApiUrl = environment.baseApiUrl;

  token: string | null = null;
  refreshToken: string | null = null;

  get isLoggedIn(): boolean {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refreshToken');
    }
    return !!this.token;
  }

  login(payload: { username: string; password: string }) {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}/auth/token`, fd)
      .pipe(tap((res) => this.saveTokens(res)));
  }

  refreshAuthToken() {
    const fd = new FormData();
    fd.append('refresh_token', this.refreshToken ?? '');

    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}/auth/refresh`, fd)
      .pipe(
        tap((res) => this.saveTokens(res)),
        catchError((err) => {
          this.logout();
          return throwError(() => err);
        })
      );
  }

  logout() {
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
  }

  private saveTokens(res: TokenResponse) {
    this.token = res.access_token;
    this.refreshToken = res.refresh_token;

    this.cookieService.set('token', res.access_token);
    this.cookieService.set('refreshToken', res.refresh_token);
  }
}
