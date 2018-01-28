import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Product } from '../../model/product';
import { DataService } from '../../common/services/data.service';
import { Category } from '../../model/category';
import { ShoppingCardService } from '../../common/services/shopping-card.service';
import { UserService } from '../../common/services/user.service';
import { LocalizationService } from '../../common/services/localization.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{

  private _products: Array<Product> = null;
  private _categories: Array<Category> = null;
  private _selectedCategory: Category = null;
  private _subscription: Subscription;

  get categories(): Array<Category>{
    return [null, ...this._categories];
  }
  get selectedCategory(): Category{
    return this._selectedCategory;
  }
  set selectedCategory(value: Category) {
    if(value){
      this.router.navigate(['products/list', value.id ]);
    }
    else{
      this.router.navigate(['products/list']);
    }
  }
  get products(): Array<Product>{
    return this._products;
  }

  productsChanged = new EventEmitter<Array<Product>>();
  selectedCategoryChanged = new EventEmitter<Category>();

  constructor(private dataService: DataService,
              private card: ShoppingCardService,
              private route: ActivatedRoute,
              private router: Router,
              public locale: LocalizationService,
              public user: UserService) { }

  ngOnInit(): void {
    this._categories = this.dataService.getCategories();
    this._subscription = this.route.paramMap.subscribe(
      params => {
        let categoryId = params.get('categoryId');
        if(categoryId){
          this._selectedCategory = this._categories.find(c => c.id === Number(categoryId));
          this.selectedCategoryChanged.emit(this._selectedCategory);
          this.productsChanged.emit(this._products);
        }
    
        this._products = this.dataService.getProducts(this._selectedCategory);
      });

  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
    
  delete(product: Product){
    this.dataService.deleteProduct(product);
    this._products = this.dataService.getProducts(this.selectedCategory);
    this.productsChanged.emit(this.products);
  }
  
  edit(product: Product){
    this.router.navigate(['/products/edit', product.id ]);
  }

  add(){
    this.router.navigate(['/products/add']);
  }
}
