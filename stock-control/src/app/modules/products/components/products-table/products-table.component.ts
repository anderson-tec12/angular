import { Component, Input } from '@angular/core';
import { IGetAllProductsResponse } from 'src/app/models/interfaces/products/IGetAllProductsResponse';

@Component({
  templateUrl: './products-table.component.html',
  styleUrls: [],
  selector:'app-products-table'
})
export class ProductsTableComponent{
  @Input() products:IGetAllProductsResponse[] = []
  productSelected!:IGetAllProductsResponse
}
