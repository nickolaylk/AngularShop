import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartServiceModule } from './cart-service.module';
import { CartWidgetModule } from './cart-widget.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartCounterComponent } from './cart-counter/cart-counter.component';
import { CartComponent } from './cart-list/cart.component';


@NgModule({
    imports: [
        CommonModule,
        CartServiceModule,
        CartWidgetModule,
        CartRoutingModule
    ],
    exports: [
        CartCounterComponent,
        CartComponent
    ]
})
export class CartModule { }