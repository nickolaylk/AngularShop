import { Component } from '@angular/core';
import { DataService } from './common/services/data.service';
import { Category } from './model/category';
import { LocalizationService } from './common/services/localization.service';
import { ShoppingCardService } from './common/services/shopping-card.service';
import { Product } from './model/product';
import { UserService } from './common/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  private _baseRoutes: Array<string> = ['home', 'about', 'products', 'contact'];
  
  title = 'Angular Shop';
  logoImageUri = '../assets/images/logo.gif';

  routes: Array<string> = this._baseRoutes;
  
  constructor(public locale: LocalizationService, 
              public card: ShoppingCardService, 
              private auth: UserService,
              private router: Router, 
              private route: ActivatedRoute){
    
    this.setRoutes();
    this.auth.loggedInChanged.subscribe(() => {
      this.setRoutes();
    });
  }

  private setRoutes(){
    if(this.auth.shoppingCardAvailable){
      this.routes = [...this._baseRoutes, 'card'];
    } 
    else{
      this.routes = this._baseRoutes;
      if(this.card.items){
        while(this.card.items.length > 0){
          this.card.delete(this.card.items[0]);
        }
      }
    }
  }
}
