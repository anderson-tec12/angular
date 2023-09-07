import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthUserRequest } from 'src/app/model/interfaces/user/AuthUserRequest';
import { AuthUserResponse } from 'src/app/model/interfaces/user/AuthUserResponse';
import { SignUpUserRequest } from 'src/app/model/interfaces/user/SignUpUserRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = environment.API_URL
  constructor(private http:HttpClient, private cookies: CookieService) { }


  signUpUser(data:SignUpUserRequest):Observable<SignUpUserRequest>{
    return this.http.post<SignUpUserRequest>(`${this.API_URL}/user`, data)
  }


  authUser(data:AuthUserRequest):Observable<AuthUserResponse>{
    return this.http.post<AuthUserResponse>(`${this.API_URL}/auth`, data)
  }

  isLoggedIn():boolean{
    const JWT_TOKEN = this.cookies.get('USER_INFO')
    return !!JWT_TOKEN
  }
}
