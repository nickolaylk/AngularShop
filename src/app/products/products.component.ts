import { Component, OnInit, EventEmitter } from '@angular/core';
import { Category } from '../model/category';
import { DataService } from '../common/services/data.service';
import { Product } from '../model/product';
import { LocalizationService } from '../common/services/localization.service';
import { FormsModule } from '@angular/forms' ;
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  private _selectedCategory: Category = null;
  private _categories: Array<Category> = null;
  private _selectedProduct: Product = null;
  private _editorEnabled: boolean = false;
  private _products: Array<Product> = null;
  private _editedProduct: Product = null;
  
  productsChanged = new EventEmitter<Array<Product>>();
  selectedProductChanged = new EventEmitter<Product>();
  editedProductChanged = new EventEmitter<Product>();
  editorEnabledChanged = new EventEmitter<boolean>();

  get selectedCategory(): Category{
    return this._selectedCategory;
  }
  set selectedCategory(value: Category) {
    this._selectedCategory = value;
    this._products = this.dataService.getProducts(this.selectedCategory);
    this.productsChanged.emit(this._products);
  }

  get categories(){
    return [null, ...this._categories];
  }

  get products(): Array<Product>{
    return this._products;
  }

  get editorEnabled() : boolean {
    return this._editorEnabled;
  }

  get selectedProduct() : Product{
    return this._selectedProduct;
  }
  
  get editedProduct() : Product{
    return this._editedProduct;
  }

  constructor(private dataService: DataService, 
          public locale: LocalizationService,
          public user: UserService){
  }

  ngOnInit() {
    this._categories = this.dataService.getCategories();
    this._products = this.dataService.getProducts();
  }

  onProductSelected(product: Product){
    this._selectedProduct = product;
    this.selectedProductChanged.emit(this._selectedProduct);
  }

  onProductClosed(product: Product){
    if(this._selectedProduct === product){
      this._selectedProduct = null;
      this.selectedProductChanged.emit(this._selectedProduct);
    }
  }

  onModeSwitch(product: Product){
    this._editedProduct = product;
    this._editorEnabled = !this._editorEnabled;
    this.editedProductChanged.emit(this._selectedProduct);
    this.editorEnabledChanged.emit(this._editorEnabled);

    if(this._products.indexOf(product) < 0){
      this._products = this.dataService.getProducts(this.selectedCategory);
      this.productsChanged.emit(this.products);
    }
  }

  onProductDeleted(product: Product){
    if(this._selectedProduct === product){
      this._selectedProduct = null;
      this.selectedProductChanged.emit(this._selectedProduct);
    }
    if(this._editedProduct === product){
      this._editedProduct = null;
      this.editedProductChanged.emit(this._selectedProduct);
    }
    if(this._editorEnabled){
      this._editorEnabled = false;
      this.editorEnabledChanged.emit(this._editorEnabled);
    }

    this.dataService.deleteProduct(product);
    this._products = this.dataService.getProducts(this.selectedCategory);
    this.productsChanged.emit(this.products);
  }

}
