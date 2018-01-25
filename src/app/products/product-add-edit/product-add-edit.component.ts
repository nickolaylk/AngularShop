import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ProductBase } from '../product-base';
import { Product } from '../../model/product';
import { Category } from '../../model/category';
import { DataService } from '../../common/services/data.service';
import { Input } from '@angular/core/src/metadata/directives';
import { LocalizationService } from '../../common/services/localization.service';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css']
})
export class ProductAddEditComponent extends ProductBase implements OnInit{
  
  private _newProduct: Product;
  private _categories: Array<Category>;
  private _category: Category;

  public get categories():Array<Category>{
    return this._categories;
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

  @Output()
  onClose: EventEmitter<Product> = new EventEmitter<Product>();
  

  constructor(protected dataService: DataService,
              public locale: LocalizationService){super();}
  
  ngOnInit(){
    
    this._categories = this.dataService.getCategories();
    this._newProduct = new Product();
    if(this.product){
      for(let property in this.product){
        this[property] = this.product[property];
      }
      for(let c of this._categories){
        if(this.categoryId === c.id){
          this._category = c;
          break;
        }
      }
    }
    else{
      this.category = null;
      this._newProduct.image = '../assets/images/no-image-slide.png';
    }
  }

  close(){
    this.onClose.emit(this.product);
  }

  reset(){
    this.ngOnInit();
  }
 
  save(close: boolean = false){
    if(this.product){
      this.dataService.updateProduct(this.product, this._newProduct);
    }
    else{
      this.dataService.addProduct(this._newProduct);
    }

    if(close){this.close();}
  }
}
