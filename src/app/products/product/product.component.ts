import { Component, Input, Output, EventEmitter} from '@angular/core';
import { ProductViewBase } from '../product-view-base';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../core/model/product';
import { UserService } from '../../core/user.service';
import { LocalizationService } from '../../core/localization.service';
import { ProductsService } from '../products.service';
import { SharedRoutingService } from '../../core/shared-routing.service';
import { Scope } from '../../core/scope.enum';
import { ScopePage } from '../../core/scope-page.enum';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends ProductViewBase {

  get product(): Product{
    return this._product;
  }

  @Input()
  set product(value: Product){
    this._product = value;
  }

  constructor(user: UserService, locale: LocalizationService,
        private _data: ProductsService,
        private _sharedRouting: SharedRoutingService,
        private _route: ActivatedRoute,
        private _router: Router)
  {
    super(locale, user);
  }

  goToDetails(){
    //this._router.navigate(['/products/details', this._product.id ]);
    this._sharedRouting.navigate(Scope.products, ScopePage.details, this._product.id.toString());
  }
}
