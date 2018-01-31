import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
    selector: 'app-cart-counter',
    templateUrl: './cart-counter.component.html',
    styleUrls: ['./cart-counter.component.css']
})
export class CartCounterComponent { 
    constructor(public cart: CartService){}

}