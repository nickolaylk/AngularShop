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
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter, map, take, first, } from 'rxjs/operators';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{

  private _categories: Observable<Category[]>;
  private _selectedCategory: Category = null;
  private _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private _subscription: Subscription;
  

  get categories(): Observable<Category[]>{
    return this._categories;
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
  get products(): Observable<Product[]>{
    return this._products.asObservable();
  }

  get editorEnabled():boolean{
    return this.user.checkPermission('admin');
  }

  productsChanged = new EventEmitter<Observable<Product[]>>();
  selectedCategoryChanged = new EventEmitter<Category>();

  constructor(private _data: ProductsService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _sharedRouting: SharedRoutingService,
              public locale: LocalizationService,
              public user: UserService) { }

  ngOnInit(): void {
    
    this._categories = this._data.categories;

    this._subscription = this._route.paramMap.subscribe(
      params => {
        let categoryId = params.get('categoryId');
        if(categoryId){
          this.setSelectedCategory(Number.parseInt(categoryId));
        }
        else{
          this._selectedCategory = null;
          this.loadProducts();
        }
      });

  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  setSelectedCategory(id: number){    
    this._categories.pipe(
        filter(c => c.length > 0),
        map(c => c.find(c => c.id === id)),
        take(1)
      ).toPromise()
      .then(c => {
        if(c == null){
          throw new Error(`Caregory ${id} not found`);
        }
        this._selectedCategory = c;
      })
      .catch(error => {
        this._router.navigate(['**']);
        console.log(error);
      });
  }
  
  private loadProducts(){
    this._data.getProducts(this._selectedCategory == null ? null : this._selectedCategory.id)
      .then(o => {
        console.log(`fetched ${o.length} products`);
        this._products.next(o);
        //this.productsChanged.emit(this.products);
      })
      .catch(error => {
        console.log(error);
      });
      
  }
  
  delete(product: Product){
    this._data.deleteProduct(product);
    this.loadProducts();
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

  categoryTrack(index: number, category: Category){
    return category == null ? -1 : category.id;
  }

  productTrack(index: number, product: Product){
    return product.id;
  }
}
