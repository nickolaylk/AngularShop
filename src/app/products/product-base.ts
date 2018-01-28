import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Product } from '../model/product';
import { DataService } from '../common/services/data.service';

@Component({})
export class ProductBase {

  protected _product: Product = null;
  
  

}
