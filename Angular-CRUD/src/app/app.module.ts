import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { HeaderComponent } from './header/header.component';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    UpdateProductComponent,
    HeaderComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: "", component: HomeComponent},
      {path: "product", component: ProductComponent},
      {path: "updateProduct/:id", component: UpdateProductComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
