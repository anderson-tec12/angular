import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { IGetAllProductsResponse } from 'src/app/models/interfaces/products/IGetAllProductsResponse';

import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private API_URL = environments.API_URL
  private JWT_TOKEN = this.cookieService.get('USER_INFO')
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type':'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`
    })
  }

  constructor(
      private httpClient:HttpClient,
      private cookieService:CookieService
  ) { }

  getAllProducts():Observable<IGetAllProductsResponse[]>{
    return this.httpClient.get<IGetAllProductsResponse[]>(`${this.API_URL}/products`, {
      ...this.httpOptions,
    }).pipe(
      map((data) => {
        return data.filter(product => product.amount > 0)
      })
    )
  }
}
