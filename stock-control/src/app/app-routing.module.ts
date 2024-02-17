import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';

import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path:'',
    redirectTo:"dashboard",
    pathMatch:'full'
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'dashboard',
    canActivate:[AuthGuardService],
    // component:DashboardHomeComponent
    loadChildren:() => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path:'products',
    canActivate:[AuthGuardService],
    // component:DashboardHomeComponent
    loadChildren:() => import('./modules/products/products.module').then((m) => m.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
