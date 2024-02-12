import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path:'',
    component: DashboardHomeComponent
  }
]
