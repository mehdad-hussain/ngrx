import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse } from '@core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(mobile: string, password: string, remember: boolean) {
    let cred = { username: mobile, password: password, device: 'Web' };
    // var encryptedCred = crypto.AES.encrypt(
    //   JSON.stringify(cred),
    //   environment.ENCRYPT_SECRET
    // ).toString();

    return this.http.post<any>('auth/login', cred).pipe(
      map((res) => {
        // if (res.Success) {
        //   // let user: any = res.Data.user;
        //   // let token = res.Data.accessToken;
        //   // // setCookie(
        //   // //   'current_session',
        //   // //   'poms_' + Date.now().toString(),
        //   // //   remember ? 1440 : 59
        //   // // );
        //   // // this.storage.storeData('_c_u', user);
        //   // localStorage.setItem('access_token', token);
        // }
        return res;
      })
    );
  }
}
