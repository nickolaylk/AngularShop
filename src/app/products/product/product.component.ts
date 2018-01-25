import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Product } from '../../model/product';
import { ShoppingCardService } from '../../common/services/shopping-card.service';
import { UserService } from '../../common/services/user.service';
import { ProductViewBase } from '../product-view-base';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends ProductViewBase {

  @Output()
  onSelect: EventEmitter<Product> = new EventEmitter<Product>();
  @Output()
  onEdit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output()
  onDelete: EventEmitter<Product> = new EventEmitter<Product>();

  select(){
    this.onSelect.emit(this.product);
  }

  edit(){
    this.onEdit.emit(this.product);
  }

  delete(){
    this.onDelete.emit(this.product);
  }
}
