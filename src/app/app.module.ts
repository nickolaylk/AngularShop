import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

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
import { ProductFullComponent } from './products/product-full/product-full.component';
import { ProductAddEditComponent } from './products/product-add-edit/product-add-edit.component';
import { ConfirmButtonDirective } from './common/directives/confirm-button.directive';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminGuard } from './admin.guard';
import { CardAvailableGuard } from './card-available-guard';


const dataServiceFactory = () => new DataService(5);
const cardServiceFactory = () => new ShoppingCardService();
const userServiceFactory = () => new UserService();
const localeServiceFactory = () => new LocalizationService('en');

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'products', component: ProductsComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', component: ProductListComponent},
      { path: 'list/:categoryId', component: ProductListComponent},
      { path: 'details/:id', component: ProductFullComponent},
      { path: 'edit/:id', component: ProductAddEditComponent, canActivate: [AdminGuard] },
      { path: 'add', component: ProductAddEditComponent, canActivate: [AdminGuard] }
    ] },
  { path: 'card', component: CardComponent, canActivate: [CardAvailableGuard]  },
  { path: '**', component: PageNotFoundComponent}
];

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
    LocalPipe,
    ProductFullComponent,
    ProductAddEditComponent,
    ConfirmButtonDirective,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, { useHash: false })
  ],
  providers: [
    {provide: DataService, useFactory: dataServiceFactory},
    {provide: ShoppingCardService, useFactory: cardServiceFactory},
    {provide: UserService, useFactory: userServiceFactory},
    {provide: LocalizationService, useFactory: localeServiceFactory},
    CardAvailableGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
