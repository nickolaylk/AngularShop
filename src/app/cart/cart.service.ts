import { Injectable, EventEmitter } from '@angular/core';
import { Product } from '../core/model/product';
import { UserService } from '../core/user.service';



@Injectable()
export class CartService {
  private _sum: number;

  sumChanged = new EventEmitter<number>();
  countChanged = new EventEmitter<number>();
  itemsChanged = new EventEmitter<Array<Product>>();

  get count(){
    return this._user.cart.length;
  }

  get sum(){
    return this._sum;
  }

  get products(): Product[]{
      return this._user.cart;
  }
  
  constructor(private _user: UserService) {
    this._sum = 0;
    this._user.cartChanged.subscribe(count =>  
        {
            this._sum = 0;
            this._user.cart.forEach((p)=>{this._sum += p.price});
            this.countChanged.emit(count);
            this.sumChanged.emit(this._sum);
            this.countChanged.emit(this.count);
        });
   }

   add(product: Product){
     this._user.addToCart(product);
   }

   delete(product: Product){
    this._user.removeFromCart(product);
  }

  contains(product: Product): boolean{
    return this._user.inCart(product);
  }

}