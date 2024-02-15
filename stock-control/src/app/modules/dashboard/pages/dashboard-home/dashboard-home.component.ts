import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs';
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

  productChartDatas!: ChartData
  productsChartOptions!: ChartOptions

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
      .pipe(take(1))
      .subscribe({
        next: response => {
          console.log('aaa',response )
          if(response.length > 0 ){
            this.productsList === response
            this.productsDtService.setProductsDatas(response)
            this.setProductsChartConfig(response)
          }

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

  setProductsChartConfig(products:IGetAllProductsResponse[]):void{
     const documentStyle = getComputedStyle(document.documentElement)
     const textColor = documentStyle.getPropertyValue('--text-color')
     const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')

     const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

     this.productChartDatas = {
      labels: products.map(p => p.name),
      datasets:[
        {
          label: 'Quantidade',
          backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
          borderColor: documentStyle.getPropertyValue('--indigo-400'),
          hoverBackgroundColor: documentStyle.getPropertyValue('--indigo-500'),
          data: products.map(p => p.amount)
        }
      ]
     }

     console.log(products)

     this.productsChartOptions = {
      maintainAspectRatio:false,
      aspectRatio: 0.8,
      plugins:{
        legend:{
          labels:{
            color:textColor
          }
        }
      },
      scales:{
        x:{
          ticks:{
            color:textColorSecondary,
            font:{
              weight:500
            }
          },
          grid:{
            color:surfaceBorder
          }
        },
        y:{
          ticks:{
            color:textColorSecondary
          },
          grid:{
            color:surfaceBorder
          }
        }
      }
     }
  }
}
