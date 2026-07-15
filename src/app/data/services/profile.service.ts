import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../interfaces/profile.interface';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class ProfileService {
  baseApiUrl = environment.baseApiUrl
  private http = inject(HttpClient)

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}/account/test_accounts`)
  }

  getMe(){
    return this.http.get<Profile>(`${this.baseApiUrl}/account/me`)
  }
}
