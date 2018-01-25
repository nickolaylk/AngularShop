import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Product } from '../model/product';
import { ShoppingCardService } from '../common/services/shopping-card.service';
import { UserService } from '../common/services/user.service';
import { ProductBase } from './product-base';
import { DataService } from '../common/services/data.service';
import { LocalizationService } from '../common/services/localization.service';

@Component({})
export class ProductViewBase extends ProductBase{

  get inCard(): boolean{
    return this.card.contains(this.product);
  }

  constructor(protected card: ShoppingCardService,
              public locale: LocalizationService,
              public user: UserService) { super();}

  addToCard(){
    this.card.add(this.product);
  }

  removeFromCard(){
    this.card.delete(this.product);
  }
  
  

}
