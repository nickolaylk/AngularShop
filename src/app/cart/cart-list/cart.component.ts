import { Component, EventEmitter } from '@angular/core';
import { Product } from '../../core/model/product';
import { CartService } from '../cart.service';
import { LocalizationService } from '../../core/localization.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  get products(): Observable<Product[]>{
    return this._cart.products;
  }

  get count(): number{
    return this._cart.count;
  }

  get sum(): number{
    return this._cart.sum;
  }

  sumChanged: EventEmitter<number> = new EventEmitter<number>();
  countChanged: EventEmitter<number> = new EventEmitter<number>();
  productsChanged: EventEmitter<Array<Product>> = new EventEmitter<Array<Product>>();

  constructor(private readonly _cart: CartService,
              public locale: LocalizationService) {
    
    this._cart.countChanged.subscribe(count =>  {this.countChanged.emit(count)});
    this._cart.sumChanged.subscribe(sum =>  {this.sumChanged.emit(sum)});
    this._cart.itemsChanged.subscribe(items =>  {this.productsChanged.emit(items)});
   }

   remove(product: Product) :void{
     this._cart.delete(product);
   }
  
}
