import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IGetAllProductsResponse } from 'src/app/models/interfaces/products/IGetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/components/services/products/products-data-transfer.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: []
})
export class DashboardHomeComponent implements OnInit {
  productsList: IGetAllProductsResponse[] = []

  constructor(
    private productsService:ProductsService,
    private messageService:MessageService,
    private productsDtService: ProductsDataTransferService
  ){}

  ngOnInit(){
    this.getProductsData()
  }

  getProductsData():void{
    this.productsService
      .getAllProducts()
      .subscribe({
        next: response => {
          this.productsList === response

          this.productsDtService.setProductsDatas(this.productsList)
        },
        error: err => {
          this.messageService.add({
            severity:'error',
            summary: 'Erro',
            detail:'Não foi possivel carregar os produtos',
            life:2500
          })
        }
      })
  }
}
