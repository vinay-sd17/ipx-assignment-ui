import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: 'products', children: [
      {
        path: ':category', children: [
          { path: '', component: ProductsComponent },
          { path: ':id', component: ProductDetailsComponent },
        ]
      },
      { path: '**', component: ProductsComponent },
    ]
  },
  { path: '**', redirectTo: 'products' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
