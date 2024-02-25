
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeleteProductAction, ProductEvent } from 'src/app/models/enums/products/ProductEvents';
import { IGetAllProductsResponse } from 'src/app/models/interfaces/products/IGetAllProductsResponse';
import { EventInterfaceProduct } from 'src/app/models/interfaces/products/events';

@Component({
  templateUrl: './products-table.component.html',
  styleUrls: [],
  selector:'app-products-table'
})
export class ProductsTableComponent{
  @Input() products:IGetAllProductsResponse[] = []
  @Output() productEvent = new EventEmitter<EventInterfaceProduct>()
  @Output() deleteProductEvent = new EventEmitter<DeleteProductAction>()

  productSelected!:IGetAllProductsResponse
  addProductEvent = ProductEvent.ADD_PRODUCT_EVENT
  editProductEvent = ProductEvent.EDIT_PRODUCT_EVENT

  handleProductEvent(action:string, id?: string):void{
    if(action && action !== ''){
      const productEventData = id && id !== '' ? {action, id} : {action}

      //Emitir o valor
      this.productEvent.emit(productEventData)
    }
  }

  handleDeleteProduct(product_id:string, product_name:string){
    if(product_id &&  product_name){
      this.deleteProductEvent.emit({
        product_id,
        product_name
      })
    }
  }
}
