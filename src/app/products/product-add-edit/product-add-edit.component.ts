import { Component, Output, EventEmitter, OnInit, OnDestroy  } from '@angular/core';
import { ProductBase } from '../product-base';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../core/model/product';
import { Category } from '../../core/model/category';
import { LocalizationService } from '../../core/localization.service';
import { ProductsService } from '../products.service';


@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css']
})
export class ProductAddEditComponent extends ProductBase implements OnInit{
  
  private _newProduct: Product;
  private _category: Category;
  private _subscription: Subscription;

  @Output()
  productChanged: EventEmitter<Product> = new EventEmitter<Product>();

  public get categories():Array<Category>{
    return this._data.categories;
  }

  public get category(): Category { return this._category;}
  public set category(value: Category){
    this._category = value;

    this.categoryId = value ? value.id : null;
    this.image = value ? `../assets/images/${value.title.toLowerCase()}.jpg` 
                  : '../assets/images/no-image-slide.png';
  }

  public get categoryId(): number { return this._newProduct.categoryId;}
  public set categoryId(value: number){this._newProduct.categoryId = value;}

  public get price(): number { return this._newProduct.price;}
  public set price(value: number){this._newProduct.price = value;}

  public get title(): string { return this._newProduct.title;}
  public set title(value: string){this._newProduct.title = value;}

  public get description(): string { return this._newProduct.description;}
  public set description(value: string){this._newProduct.description = value;}

  public get image(): string { return this._newProduct.image;}
  public set image(value: string){this._newProduct.image = value;}

  
  constructor(private locale: LocalizationService,
              private _data: ProductsService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _location: Location)
  {
    super();
  }
  
  ngOnInit(){
    
    this._newProduct = new Product();

    this._subscription = this._route.paramMap.subscribe(
      params => {
        let id = params.get('id');
        if(id){
          this._product = this._data.getProduct(Number(id));
          if(this._product){
            for(let property in this._product){
              this[property] = this._product[property];
            }
            this._category = this.categories.find(c => c.id === this.categoryId);
          }
          else{
            this._router.navigate(['**']);
          }
        }
        else{
          this.category = null;
          this._newProduct.image = '../assets/images/no-image-slide.png';
        }

      });
    
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  close(){
    this._location.back();
  }

  reset(){
    this.ngOnInit();
  }
 
  save(close: boolean = false){
    if(this._product){
      this._data.updateProduct(this._product, this._newProduct);
    }
    else{
      this._data.addProduct(this._newProduct);
    }

    if(close){this.close();}
  }
}
