import { Component, EventEmitter } from '@angular/core';
import { ShoppingCardService } from '../common/services/shopping-card.service';
import { Product } from '../model/product';
import { LocalizationService } from '../common/services/localization.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  get items(): Array<Product>{
    return this.card.items;
  }

  get count(): number{
    return this.card.count;
  }

  get sum(): number{
    return this.card.sum;
  }

  sumChanged: EventEmitter<number> = new EventEmitter<number>();
  countChanged: EventEmitter<number> = new EventEmitter<number>();
  itemsChanged: EventEmitter<Array<Product>> = new EventEmitter<Array<Product>>();

  constructor(private readonly card: ShoppingCardService,
    public locale: LocalizationService) {
    
    this.card.countChanged.subscribe(count =>  {this.countChanged.emit(count)});
    this.card.sumChanged.subscribe(sum =>  {this.sumChanged.emit(sum)});
    this.card.itemsChanged.subscribe(items =>  {this.itemsChanged.emit(items)});
   }

   remove(item: Product) :void{
     this.card.delete(item);
   }
  
}
