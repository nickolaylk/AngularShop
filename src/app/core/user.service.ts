import { Injectable, EventEmitter } from '@angular/core';
import { User } from './model/user';
import { Product } from './model/product';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from './notification.service';

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

  get cart(): BehaviorSubject<Product[]>{
    return this._currentUser ? this._currentUser.cart : null;
  }

  get loggedIn(): boolean{
    return this._currentUser != null;
  }

  usernameChanged = new EventEmitter<string>();
  loggedInChanged = new EventEmitter<boolean>();
  featuresChanged = new EventEmitter<string[]>();
  permissionsChanged = new EventEmitter<string[]>();

  constructor(private _notifications: NotificationService) { 
    this._currentUser = null;
  }

  login(username: string, pwd: string): boolean{
    this._notifications.notify(`Try to log in ${username}`);
    
    if(username + username.length == pwd){
      this._currentUser = new User();
      this._currentUser.username = username;
      this._currentUser.cart = new BehaviorSubject<Product[]>([]);
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
      
      this._notifications.notify(`${username} logged in`);
      return true;
    }
    else{
      this._notifications.notify(`${username} is not authorized user`);
      return false;
    }
  }

  logout(){
    this._notifications.notify(`${this._currentUser ? this._currentUser.username : ''} logging out`);
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
    if(product && this._currentUser && this._currentUser.cart.value.indexOf(product) < 0){
      this._currentUser.cart.value.push(product);
      this._currentUser.cart.next(this._currentUser.cart.value);
      this._notifications.notify(`${product.title} added to cart`);
    }
  }

  removeFromCart(product: Product){
    if(!product){
      return;
    }
    let index: number = this._currentUser.cart.value.indexOf(product);
    if(index >= 0){
      this._currentUser.cart.value.splice(index, 1);
      this._currentUser.cart.next(this._currentUser.cart.value);
      this._notifications.notify(`${product.title} removed to cart`);
    }    
  }

  inCart(product: Product){
    return this._currentUser ? this._currentUser.cart.value.indexOf(product) >= 0 : false;
  }

}
