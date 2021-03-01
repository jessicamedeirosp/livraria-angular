import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { ProductFormComponent } from "./pages/products/product-form/product-form.component";
import { ProductListComponent } from "./pages/products/product-list/product-list.component";

const routes: Routes = [
  {
    path: "",
    component: ProductListComponent,
  },
  {
    path: "create",
    component: ProductFormComponent,
  },
  {
    path: "update/:id",
    component: ProductFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
