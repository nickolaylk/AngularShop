import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { ContactComponent } from './contact/contact.component';
import { DataService } from './common/services/data.service';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductComponent } from './products/product/product.component';
import { NavPaneComponent } from './nav-pane/nav-pane.component';
import { UserAreaComponent } from './user-area/user-area.component';
import { CardComponent } from './card/card.component';
import { ShoppingCardService } from './common/services/shopping-card.service';
import { UserService } from './common/services/user.service';
import { LocalizationService } from './common/services/localization.service';
import { FormsModule } from '@angular/forms';
import { LocalPipe } from './common/local-pipe';

const dataServiceFactory = () => new DataService(5);
const cardServiceFactory = () => new ShoppingCardService();
const userServiceFactory = () => new UserService();
const localeServiceFactory = () => new LocalizationService('en');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ProductsComponent,
    ContactComponent,
    ProductListComponent,
    ProductComponent,
    NavPaneComponent,
    UserAreaComponent,
    CardComponent,
    LocalPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    {provide: DataService, useFactory: dataServiceFactory},
    {provide: ShoppingCardService, useFactory: cardServiceFactory},
    {provide: UserService, useFactory: userServiceFactory},
    {provide: LocalizationService, useFactory: localeServiceFactory}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
