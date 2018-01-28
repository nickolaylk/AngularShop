import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Product } from '../../model/product';
import { ShoppingCardService } from '../../common/services/shopping-card.service';
import { UserService } from '../../common/services/user.service';
import { ProductViewBase } from '../product-view-base';
import { LocalizationService } from '../../common/services/localization.service';
import { DataService } from '../../common/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(card: ShoppingCardService,
    user: UserService,
    locale: LocalizationService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router){super(card, locale, user);}

  goToDetails(){
    this.router.navigate(['/products/details', this._product.id ]);
  }
}
