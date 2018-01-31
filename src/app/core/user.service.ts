import { Injectable, EventEmitter } from '@angular/core';
import { User } from './model/user';
import { Product } from './model/product';

@Injectable()
export class UserService {

  private _currentUser: User;
  
  get username(): string{
    return this._currentUser ? this._currentUser.username : '';
  }

  get features(): string[]{
    return this._currentUser ? this._currentUser.features: [];
  }

  get permissions(): string[]{
    return this._currentUser ? this._currentUser.permissions: [];
  }

  get cart(): Product[]{
    return this._currentUser ? this._currentUser.cart : null;
  }

  get loggedIn(): boolean{
    return this._currentUser != null;
  }

  usernameChanged = new EventEmitter<string>();
  loggedInChanged = new EventEmitter<boolean>();
  cartChanged = new EventEmitter<Product[]>();
  featuresChanged = new EventEmitter<string[]>();
  permissionsChanged = new EventEmitter<string[]>();

  constructor() { 
    this._currentUser = null;
  }

  login(username: string, pwd: string): boolean{
    
    if(username + username.length == pwd){
      this._currentUser = new User();
      this._currentUser.username = username;
      this._currentUser.cart = [];
      switch(this._currentUser.username){
        case('dev'):{
          this._currentUser.features = ['cart'];
          this._currentUser.permissions = ['admin'];
          break;
        }
        case('admin'):{
          this._currentUser.features = [];
          this._currentUser.permissions = ['admin'];
          break;
        }
        default:{
          this._currentUser.features = ['cart'];
          this._currentUser.permissions = [];
          break;
        }
      }
      
      this.usernameChanged.emit(this.username);
      this.loggedInChanged.emit(this.loggedIn);
      this.permissionsChanged.emit(this.permissions);
      this.featuresChanged.emit(this.features);
      this.cartChanged.emit(this.cart);
      
      return true;
    }
    else{
      return false;
    }
  }

  logout(){
    this._currentUser = null;
    this.usernameChanged.emit(this.username);
    this.loggedInChanged.emit(this.loggedIn);
  }

  checkFeature(feature: string): boolean{
    return this._currentUser == null ? false : this._currentUser.features.indexOf(feature) >= 0;
  }

  checkPermission(permission: string): boolean{
    return this._currentUser == null ? false : this._currentUser.permissions.indexOf(permission) >= 0;
  }

  addToCart(product: Product){
    if(this._currentUser && this._currentUser.cart.indexOf(product) < 0){
      this._currentUser.cart.push(product);
      this.cartChanged.emit(this.cart);
    }
  }

  removeFromCart(product: Product){
    let index: number = this._currentUser.cart.indexOf(product);
    if(index >= 0){
      this._currentUser.cart.splice(index, 1);
      this.cartChanged.emit(this.cart);
    }    
  }

  inCart(product: Product){
    return this._currentUser ? this._currentUser.cart.indexOf(product) >= 0 : false;
  }

}
