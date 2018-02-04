import { Injectable, EventEmitter } from '@angular/core';
import { Product } from '../core/model/product';
import { UserService } from '../core/user.service';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from '../core/notification.service';



@Injectable()
export class CartService {
  private _sum: number;
  private _count: number;

  sumChanged = new EventEmitter<number>();
  countChanged = new EventEmitter<number>();
  itemsChanged = new EventEmitter<Array<Product>>();

  get count(): number{
    return this._count;
  }

  get sum(): number{
    return this._sum;
  }

  get products(): Observable<Product[]>{
      return this._user.cart.asObservable();
  }
  
  constructor(private _user: UserService,
    private _notifications: NotificationService) {
    this._sum = 0;
    this._user.cart.subscribe(count =>  
        {
            this._sum = 0;
            this._count = 0;
            this._user.cart.value.forEach((p)=>{
              this._count++;
              this._sum += p.price
            });
            this.countChanged.emit(this._count);
            this.sumChanged.emit(this._sum);
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