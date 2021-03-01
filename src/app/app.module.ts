import { LOCALE_ID, NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { IMaskModule } from 'angular-imask';

import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductListComponent,
    ProductFormComponent,
    FormFieldErrorComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IMaskModule

  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {}
