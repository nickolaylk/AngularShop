import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductViewBase } from '../product-view-base';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../core/user.service';
import { LocalizationService } from '../../core/localization.service';
import { Product } from '../../core/model/product';
import { ProductsService } from '../products.service';
import { SharedRoutingService } from '../../core/shared-routing.service';
import { ScopePage } from '../../core/scope-page.enum';
import { Scope } from '../../core/scope.enum';




@Component({
  selector: 'app-product-full',
  templateUrl: './product-full.component.html',
  styleUrls: ['./product-full.component.css']
})
export class ProductFullComponent extends ProductViewBase 
                                  implements OnInit, OnDestroy{ 
  private _subscription: Subscription;

  get product(): Product{
    return this._product;
  }
  
  @Output()
  productChanged: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(user: UserService, locale: LocalizationService,
              private _data: ProductsService,
              private _sharedRouting: SharedRoutingService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _location: Location
              )
    {
      super(locale, user);
    }

  ngOnInit(): void {
    
    this._subscription = this._route.paramMap.subscribe(
      params => {
        let id = params.get('id');
        if(id){
          this._product = this._data.getProduct(Number(id));
        }
        if(this._product){
          this.productChanged.emit(this._product);
        }
        else{
          this._router.navigate(['**']);
        }
      });

  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  close(){
    this._location.back();
  }
  
  edit(){
    this._sharedRouting.navigate(Scope.products, ScopePage.editor, this._product.id.toString());
  }

  delete(){
    this._data.deleteProduct(this._product);
    this._location.back();
  }
}
