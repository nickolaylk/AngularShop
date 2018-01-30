import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
  
  constructor(private router: Router, 
              private route: ActivatedRoute){
    
    this.setRoutes();
    /*
    this._user.loggedInChanged.subscribe(() => {
      this.setRoutes();
    });
    */
  }

  private setRoutes(){
    /*
    if(this._user.checkPermission('cart')){
      this.routes = [...this._baseRoutes, 'cart'];
    } 
    else{
      this.routes = this._baseRoutes;
    }
    */
  }
}
