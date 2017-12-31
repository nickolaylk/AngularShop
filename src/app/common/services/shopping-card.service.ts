import { Injectable, EventEmitter } from '@angular/core';
import { Product } from '../../model/product';
import { UserService } from './user.service';

@Injectable()
export class ShoppingCardService {
  
  private _sum: number;

  items: Array<Product>;
  sumChanged = new EventEmitter<number>();
  countChanged = new EventEmitter<number>();
  itemsChanged = new EventEmitter<Array<Product>>();

  get count(){
    return this.items.length;
  }

  get sum(){
    let result: number = 0;
    this.items.forEach((p)=>{result += p.price});
    return result;
  }

  constructor() {
    this._sum = 0;
    this.items = new Array<Product>();
   }

   add(item: Product){
     if(this.items.findIndex((p) => {if(p === item){return true;}})<0){
      this.items.push(item);
      this._sum += item.price;
      this.sumChanged.emit(this._sum);
      this.countChanged.emit(this.items.length);
      this.itemsChanged.emit(this.items);
     }
   }

   delete(item: Product){
    let index: number = this.items.findIndex((p) => {if(p === item){return true;}});
    if(index >= 0){
      this.items.splice(index, 1);
      this._sum -= item.price;
      this.sumChanged.emit(this._sum);
      this.countChanged.emit(this.items.length);
      this.itemsChanged.emit(this.items);
    }
  }

  contains(item: Product): boolean{
    return this.items.findIndex((p) => {if(p === item){return true;}})>=0;
  }

}
