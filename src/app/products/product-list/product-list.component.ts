import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Category } from '../../core/model/category';
import { ProductsService } from '../products.service';
import { LocalizationService } from '../../core/localization.service';
import { UserService } from '../../core/user.service';
import { Product } from '../../core/model/product';
import { SharedRoutingService } from '../../core/shared-routing.service';
import { Scope } from '../../core/scope.enum';
import { ScopePage } from '../../core/scope-page.enum';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{

  private _selectedCategory: Category = null;
  private _subscription: Subscription;

  get categories(): Array<Category>{
    return [null, ...this._data.categories];
  }
  get selectedCategory(): Category{
    return this._selectedCategory;
  }
  set selectedCategory(value: Category) {
    if(value){
      this._router.navigate(['products/list', value.id ]);
    }
    else{
      this._router.navigate(['products/list']);
    }
  }
  get products(): Array<Product>{
    return this._data.products;
  }

  productsChanged = new EventEmitter<Array<Product>>();
  selectedCategoryChanged = new EventEmitter<Category>();

  constructor(private _data: ProductsService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _sharedRouting: SharedRoutingService,
              public locale: LocalizationService,
              public user: UserService) { }

  ngOnInit(): void {
    
    this._subscription = this._route.paramMap.subscribe(
      params => {
        let categoryId = params.get('categoryId');
        if(categoryId){
          this._selectedCategory = this._data.categories.find(c => c.id === Number(categoryId));
          this.selectedCategoryChanged.emit(this._selectedCategory);
        }
    
        this._data.loadProducts(this._selectedCategory);
        this.productsChanged.emit(this.products);
        
      });

  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
    
  delete(product: Product){
    this._data.deleteProduct(product);
    this._data.loadProducts(this.selectedCategory);
    this.productsChanged.emit(this.products);
  }
  
  edit(product: Product){
    //this.router.navigate(['/products/edit', product.id ]);
    this._sharedRouting.navigate(Scope.products, ScopePage.editor, product.id.toString());
  }

  add(){
    //this.router.navigate(['/products/add']);
    this._sharedRouting.navigate(Scope.products, ScopePage.add);
  }
}
