import { Component, Input, Output, EventEmitter} from '@angular/core';

import { ProductBase } from './product-base';
import { LocalizationService } from '../core/localization.service';
import { UserService } from '../core/user.service';


@Component({})
export class ProductViewBase extends ProductBase{

  get inCart(): boolean{
    return this._user.inCart(this._product);
  }

  get editorEnabled():boolean{
    return this._user.checkPermission('admin');
  }

  get cartEnabled():boolean{
    return this._user.checkFeature('cart');
  }

  constructor(public locale: LocalizationService, protected _user: UserService)
  {
      super();
  }

  addToCart(){
    this._user.addToCart(this._product);
  }

  removeFromCart(){
    this._user.removeFromCart(this._product);
  }
  
  

}
