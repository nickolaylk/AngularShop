import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart-list/cart.component';
import { CartAvailableGuard } from '../core/cart-available-guard';

const routes: Routes = [
    { path: 'cart', component: CartComponent, canActivate: [CartAvailableGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule {

}
