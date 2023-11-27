import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./page/dashboard/dashboard.component').then(
      m => m.DashboardComponent
    ),
  },
  {
    path: 'dashboard',
    redirectTo: '',
  },
  {
    path: 'products',
    loadComponent: () => import('./page/product/product.component').then(
      m => m.ProductComponent
    ),
  },
  {
    path: 'product/edit/:id',
    loadComponent: () => import('./page/product-editor/product-editor.component').then(
      m => m.ProductEditorComponent
    ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
