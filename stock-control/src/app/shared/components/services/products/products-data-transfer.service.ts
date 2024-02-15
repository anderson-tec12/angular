import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { IGetAllProductsResponse } from 'src/app/models/interfaces/products/IGetAllProductsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {
  // $ conveção pra retorno de observable em propriedades
  // BehaviorSubject
  productsDataEmitter$ = new BehaviorSubject<IGetAllProductsResponse[] | null>(null)
  productsDatas:IGetAllProductsResponse[] = []

  setProductsDatas(products: IGetAllProductsResponse[]):void{
    if(products){
      // passe pra que, esta escrito esse novo dado e atualize
      this.productsDataEmitter$.next(products)
      this.getProductsDatas();
    }
  }

  getProductsDatas(){
    this.productsDataEmitter$
      .pipe(
        take(1), // ele desescreve automaticamente
        map((data) => data?.filter(product => product.amount > 0))
      )
      .subscribe({
        next:(response) => {
          if(response){
            this.productsDatas = response
          }
        }
      })

      return this.productsDatas
  }
}
