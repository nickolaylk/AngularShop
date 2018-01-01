import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingCardService } from '../../common/services/shopping-card.service';
import { Product } from '../../model/product';
import { ProductBase } from '../product-base';

@Component({
  selector: 'app-product-full',
  templateUrl: './product-full.component.html',
  styleUrls: ['./product-full.component.css']
})
export class ProductFullComponent extends ProductBase { 

  @Output()
  onClose: EventEmitter<Product> = new EventEmitter<Product>();

  close(){
    this.onClose.emit(this.product);
  }
}
