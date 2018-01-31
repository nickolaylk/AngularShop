import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './core/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  private _baseFeatures: Array<string> = ['home', 'about', 'products', 'contact'];
  
  title = 'Angular Shop';
  logoImageUri = '../assets/images/logo.gif';

  routes: Array<string> = this._baseFeatures;
  
  constructor(private _user: UserService,
              private _router: Router, 
              private _route: ActivatedRoute){
    
    this.setRoutes();
    
    this._user.loggedInChanged.subscribe(() => {
      this.setRoutes();
    });
    
  }

  private setRoutes(){
    if(this._user.checkFeature('cart')){
      this.routes = [...this._baseFeatures, 'cart'];
    } 
    else{
      this.routes = this._baseFeatures;
    }
  }
}
