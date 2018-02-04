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

  private _selectedCategory: Category = null;
  private _subscription: Subscription;
  
  get categories(): Observable<Category[]>{
    return this._data.categories;
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
    return this._data.products.pipe(
            filter(o => o.length > 0),
            map(o=>{
                let result = o.filter(p => this._selectedCategory == null 
                                          ? true 
                                          : p.categoryId === this._selectedCategory.id);
                return result;
            })
        );
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
    
    this._subscription = this._route.paramMap.subscribe(
      params => {
        let categoryId = params.get('categoryId');
        if(categoryId){
          this.setSelectedCategory(Number.parseInt(categoryId));
        }
        else{
          this._selectedCategory = null;
        }
      });

  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  setSelectedCategory(id: number){    
    this.categories.pipe(
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
  
  delete(product: Product){
    this._data.deleteProduct(product);
    this.productsChanged.emit(this.products);
  }
  
  edit(product: Product){
    this._sharedRouting.navigate(Scope.products, ScopePage.editor, product.id.toString());
  }

  add(){
    this._sharedRouting.navigate(Scope.products, ScopePage.add);
  }

  /*
  categoryTrack(index: number, category: Category){
    return category == null ? -1 : category.id;
  }

  productTrack(index: number, product: Product){
    return product.id;
  }
  */
}
