import { Component, EventEmitter } from '@angular/core';
import { LocalizationService } from '../common/services/localization.service';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.css']
})
export class UserAreaComponent{

  get username(): string{
    return this.auth.username;
  }

  get isAdmin(): boolean{
    return this.auth.isAdmin;
  }

  get loggedIn(): boolean{
    return this.auth.loggedIn;
  }
  
  usernameChanged = new EventEmitter<string>();
  isAdminChanged = new EventEmitter<boolean>();
  loggedInChanged = new EventEmitter<boolean>();

  public usernameInput: string;
  public pwdInput: string;

  constructor(public locale: LocalizationService,
              private auth: UserService) { }

  login(){
    if(this.auth.login(this.usernameInput, this.pwdInput)){
      this.usernameChanged.emit(this.username);
      this.isAdminChanged.emit(this.isAdmin);
      this.loggedInChanged.emit(this.loggedIn);
    }
    this.pwdInput = "";
  }

  logout(){
    this.auth.logout();
    this.usernameChanged.emit(this.username);
    this.isAdminChanged.emit(this.isAdmin);
    this.loggedInChanged.emit(this.loggedIn);
  }

}
