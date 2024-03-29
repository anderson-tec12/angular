import { ProductsDataTransferService } from './../../../../shared/components/services/products/products-data-transfer.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products/products.service';
import { IGetAllProductsResponse } from 'src/app/models/interfaces/products/IGetAllProductsResponse';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EventInterfaceProduct } from 'src/app/models/interfaces/products/events';
import { DeleteProductAction } from 'src/app/models/enums/products/ProductEvents';

@Component({
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.scss']
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$ :Subject<void> = new Subject()
  productsDatas:IGetAllProductsResponse[] = []

  constructor(
    private productsService:ProductsService,
    private productsDataTransferService:ProductsDataTransferService,
    private router:Router,
    private messageService:MessageService,
    private confirmationService:ConfirmationService
  ){}


  ngOnInit(){
    this.getServiceProductsData()
  }

  getServiceProductsData() {
    const productsLoaded = this.productsDataTransferService.getProductsDatas()

    if(productsLoaded.length > 0){
      this.productsDatas = productsLoaded
    }else{
      this.getAPIProductsDatas()
    }

  }

  getAPIProductsDatas() {
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(response) => {
          this.productsDatas = response
        },
        error: err => {
          console.log(err)
          this.messageService.add({
            severity:'error',
            summary:'Erro'
          })
          this.router.navigate(['/dashboard'])

        }
      })
  }

  handleProductionAction(event:EventInterfaceProduct){
    console.log('Event', {event})
  }

  handleDeleteProductAcion(event:DeleteProductAction){
    if(event.product_id && event.product_name){
      this.confirmationService.confirm({
        message:`Confirma a exclusão do produto ${event.product_name}`,
        header:'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept:() => this.deleteProduct(event.product_id)
      })
    }
  }


  deleteProduct(productId:string){
    if(productId){
      this.productsService
      .deleteProducts(productId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(response) => {
          this.messageService.add({
            severity:'success',
            summary:'Sucesso',
            detail:'Produto removido com sucesso!',
            life: 2500
          })

          this.getAPIProductsDatas()
        },
        error:(err) => {
          console.log({err})
        }
      })
    }
  }

  ngOnDestroy(): void {
      this.destroy$.next()
      this.destroy$.complete()
  }
}
