import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../../model/user';

@Injectable()
export class UserService {

  private _currentUser: User;
  
  get username(): string{
    return this._currentUser ? this._currentUser.username : '';
  }

  get isAdmin(): boolean{
    return this._currentUser ? this._currentUser.isAdmin : false;
  }

  get loggedIn(): boolean{
    return this._currentUser != null;
  }

  usernameChanged = new EventEmitter<string>();
  isAdminChanged = new EventEmitter<boolean>();
  loggedInChanged = new EventEmitter<boolean>();

  constructor() { 
    this._currentUser = null;
  }

  login(username: string, pwd: string): boolean{
    
    if(username + username.length == pwd){
      this._currentUser = new User();
      this._currentUser.username = username;
      this._currentUser.isAdmin = this._currentUser.username.toLowerCase().startsWith('admin');
      this.usernameChanged.emit(this.username);
      this.isAdminChanged.emit(this.isAdmin);
      this.loggedInChanged.emit(this.loggedIn);
      return true;
    }
    else{
      return false;
    }
  }

  logout(){
    this._currentUser = null;
    this.usernameChanged.emit(this.username);
    this.isAdminChanged.emit(this.isAdmin);
    this.loggedInChanged.emit(this.loggedIn);
  }
}
