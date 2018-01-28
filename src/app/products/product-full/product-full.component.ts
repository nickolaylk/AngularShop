import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCardService } from '../../common/services/shopping-card.service';
import { Product } from '../../model/product';
import { ProductViewBase } from '../product-view-base';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from '../../common/services/data.service';
import { LocalizationService } from '../../common/services/localization.service';
import { UserService } from '../../common/services/user.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(card: ShoppingCardService,
              user: UserService,
              private dataService: DataService,
              private location: Location,
              private route: ActivatedRoute,
              private router: Router,
              public locale: LocalizationService){super(card, locale, user);}

  ngOnInit(): void {
    
    this._subscription = this.route.paramMap.subscribe(
      params => {
        let id = params.get('id');
        if(id){
          this._product = this.dataService.getProduct(Number(id));
        }
        if(this._product){
          this.productChanged.emit(this._product);
        }
        else{
          this.router.navigate(['**']);
        }
      });

  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  close(){
    this.location.back();
  }
  
  edit(){
    this.router.navigate(['/products/edit', this._product.id ]);
  }

  delete(){
    this.dataService.deleteProduct(this._product);
    this.location.back();
  }
}
