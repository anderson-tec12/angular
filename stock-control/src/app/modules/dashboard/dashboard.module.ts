import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { RouterModule } from '@angular/router';
import { DASHBOARD_ROUTES } from './dashboard.routing.module';

import {SidebarModule} from 'primeng/sidebar'
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    //lazyload
    RouterModule.forChild(DASHBOARD_ROUTES),
    // primeNG
    SidebarModule,
    ButtonModule,
    ToolbarModule,
    CardModule,
    ToastModule
  ],
  providers: [CookieService, MessageService],
})
export class DashboardModule { }
