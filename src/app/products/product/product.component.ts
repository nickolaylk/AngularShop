import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Product } from '../../model/product';
import { ShoppingCardService } from '../../common/services/shopping-card.service';
import { UserService } from '../../common/services/user.service';
import { ProductBase } from '../product-base';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends ProductBase {

  @Output()
  onSelect: EventEmitter<Product> = new EventEmitter<Product>();

  close(){
    this.onSelect.emit(this.product);
  }
}
