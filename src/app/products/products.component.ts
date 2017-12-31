import { Component, OnInit, EventEmitter } from '@angular/core';
import { Category } from '../model/category';
import { DataService } from '../common/services/data.service';
import { Product } from '../model/product';
import { LocalizationService } from '../common/services/localization.service';
import { FormsModule } from '@angular/forms' ;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  private _selectedCategory: Category = null;
  private _categories: Array<Category> = null;
  
  productsChanged = new EventEmitter<Array<Product>>();

  get selectedCategory(): Category{
    return this._selectedCategory;
  }
  set selectedCategory(value: Category) {
    this._selectedCategory = value;
    this.products = this.dataService.getProducts(this.selectedCategory);
    this.productsChanged.emit(this.products);
  }

  get categories(){
    return [null, ...this._categories];
  }
  
  selectedProduct: Product = null;
  products: Array<Product> = null;
  
  constructor(private dataService: DataService, 
          public locale: LocalizationService){
  }

  ngOnInit() {
    this._categories = this.dataService.getCategories();
    this.products = this.dataService.getProducts();
  }

  onProductSelected(product: Product){
    this.selectedProduct = product;
  }

}
