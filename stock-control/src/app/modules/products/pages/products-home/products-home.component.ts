import { ProductsDataTransferService } from './../../../../shared/components/services/products/products-data-transfer.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products/products.service';
import { IGetAllProductsResponse } from 'src/app/models/interfaces/products/IGetAllProductsResponse';
import { MessageService } from 'primeng/api';

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
    private messageService:MessageService
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

  ngOnDestroy(): void {
      this.destroy$.next()
      this.destroy$.complete()
  }
}
