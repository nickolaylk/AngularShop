import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Product } from '../model/product';
import { ShoppingCardService } from '../common/services/shopping-card.service';
import { UserService } from '../common/services/user.service';

@Component({})
export class ProductBase {

  get inCard(): boolean{
    return this.card.contains(this.product);
  }

  @Input()
  product: Product;

  constructor(protected card: ShoppingCardService, 
              public user: UserService) { }

  addToCard(){
    this.card.add(this.product);
  }

  removeFromCard(){
    this.card.delete(this.product);
  }
  
  

}
