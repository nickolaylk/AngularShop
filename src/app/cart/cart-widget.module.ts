import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartCounterComponent } from './cart-counter/cart-counter.component';
import { CartComponent } from './cart-list/cart.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        CartCounterComponent,
        CartComponent
    ],
    exports: [
        CartCounterComponent,
        CartComponent
    ]
})
export class CartWidgetModule { }