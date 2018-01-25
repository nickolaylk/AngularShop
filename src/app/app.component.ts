import { Component } from '@angular/core';
import { DataService } from './common/services/data.service';
import { Category } from './model/category';
import { LocalizationService } from './common/services/localization.service';
import { ShoppingCardService } from './common/services/shopping-card.service';
import { Product } from './model/product';
import { UserService } from './common/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  private _baseSections: Array<string> = ['home', 'about', 'products', 'contact'];
  
  title = 'Angular Shop';
  logoImageUri = '../assets/images/logo.gif';

  sections: Array<string> = this._baseSections;
  selectedSection: string = this.sections[0];

  constructor(public locale: LocalizationService, 
              public card: ShoppingCardService, 
              private auth: UserService){
    
    this.setSections();
    this.auth.loggedInChanged.subscribe(() => {
      this.setSections();
    });
  }

  onNavigationRequested(section: string) {
    this.selectedSection = section;
  }

  private setSections(){
    if(this.auth.shoppingCardAvailable){
      this.sections = [...this._baseSections, 'card'];
    } 
    else{
      this.sections = this._baseSections;
      if(this.card.items){
        while(this.card.items.length > 0){
          this.card.delete(this.card.items[0]);
        }
      }
    }
  }
}
