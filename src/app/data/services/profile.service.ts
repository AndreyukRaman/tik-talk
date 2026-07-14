import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';

@Injectable({providedIn: 'root'})
export class ProfileService {
  baseApiUrl = 'https://icherniakov.ru/yt-course/'
  private http = inject(HttpClient)

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`)
  }
}
