import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { I_AuthUserRequest } from 'src/app/models/interfaces/user/auth/IAuthUserRequest';
import { I_AuthUserResponse } from 'src/app/models/interfaces/user/auth/IAuthUserResponse';
import { I_SignupUserRequest } from 'src/app/models/interfaces/user/signup/ISignupUserRequest';
import { I_SignupUserResponse } from 'src/app/models/interfaces/user/signup/ISignupUserResponse';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environments.API_URL
  constructor(private httpClient:HttpClient, private cookieService:CookieService) { }

  signupUser(payload:I_SignupUserRequest):Observable<I_SignupUserResponse>{
    return this.httpClient.post<I_SignupUserResponse>(`${this.API_URL}/user`, payload)
  }

  authUser(payload:I_AuthUserRequest):Observable<I_AuthUserResponse>{
    return this.httpClient.post<I_AuthUserResponse>(`${this.API_URL}/auth`, payload)
  }

  isLoggedIn():boolean{
    const JWT_TOKEN = this.cookieService.get('USER_INFO')
    return JWT_TOKEN ? true : false
  }
}
