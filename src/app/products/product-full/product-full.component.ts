import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingCardService } from '../../common/services/shopping-card.service';
import { Product } from '../../model/product';
import { ProductViewBase } from '../product-view-base';

@Component({
  selector: 'app-product-full',
  templateUrl: './product-full.component.html',
  styleUrls: ['./product-full.component.css']
})
export class ProductFullComponent extends ProductViewBase { 

  @Output()
  onClose: EventEmitter<Product> = new EventEmitter<Product>();
  @Output()
  onEdit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output()
  onDelete: EventEmitter<Product> = new EventEmitter<Product>();
  
  close(){
    this.onClose.emit(this.product);
  }
  
  edit(){
    this.onEdit.emit(this.product);
  }

  delete(){
    this.onDelete.emit(this.product);
  }
}
