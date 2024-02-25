import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { IGetCategoriesResponse } from 'src/app/models/interfaces/categories/reponses/IGetCategoriesResponse';

import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private API_URL = environments.API_URL
  private JWT_TOKEN = this.cookieService.get('USER_INFO')
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type':'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`
    })
  }

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getAllCategories(): Observable<IGetCategoriesResponse[]>{
    return this.http.get<IGetCategoriesResponse[]>(`${this.API_URL}/categories`, {
      ...this.httpOptions
    })
  }
}
