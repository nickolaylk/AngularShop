import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../model/product';
import { DataService } from '../../common/services/data.service';
import { Category } from '../../model/category';
import { ShoppingCardService } from '../../common/services/shopping-card.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  @Input()
  products: Array<Product> = null;

  @Output()
  productSelected = new EventEmitter<Product>();
  @Output()
  productEditCalled = new EventEmitter<Product>();
  @Output()
  productDeleted: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private _dataService: DataService,
        private card: ShoppingCardService) { }

  onProductSelected(product: Product){
    this.productSelected.emit(product);
  }

  onProductEditCalled(product: Product){
    this.productEditCalled.emit(product);
  }


  addToCard(product: Product){
    this.card.add(product);
  }

  removeFromCard(product: Product){
    this.card.delete(product);
  }
  
  deleteProduct(product: Product){
    this.productDeleted.emit(product);
  }
}
