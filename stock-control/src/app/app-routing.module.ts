import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { DashboardHomeComponent } from './modules/dashboard/pages/dashboard-home/dashboard-home.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
