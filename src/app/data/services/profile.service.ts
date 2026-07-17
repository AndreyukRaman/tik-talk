import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../interfaces/profile.interface';
import { environment } from '../../../environments/environment';
import { Pageble } from '../interfaces/pageble.interface';
import { map, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProfileService {
  baseApiUrl = environment.baseApiUrl
  private http = inject(HttpClient)

  me= signal<Profile | null>(null)

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}/account/test_accounts`)
  }



  getAccount(id:string){
    return this.http.get<Profile>(`${this.baseApiUrl}/account/${id}`)
  }

  getSubscribersShortList(subsAmount= 3){
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}/account/subscribers/`).pipe(
      map(res => res.items.slice(0, subsAmount))
    )
  }


  patchProfile(profile: Partial<Profile>){
    return this.http.patch(`${this.baseApiUrl}/account/me`, profile)
  }

  getMe(){
    return this.http.get<Profile>(`${this.baseApiUrl}/account/me`).pipe(tap(res => this.me.set(res)))
  }
}
