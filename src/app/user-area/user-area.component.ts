import { Component, EventEmitter } from '@angular/core';
import { LocalizationService } from '../common/services/localization.service';
import { UserService } from '../common/services/user.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.css']
})
export class UserAreaComponent implements OnInit{

  private _returnUrl: string;

  get username(): string{
    return this.user.username;
  }

  get isAdmin(): boolean{
    return this.user.isAdmin;
  }

  get loggedIn(): boolean{
    return this.user.loggedIn;
  }
  
  usernameChanged = new EventEmitter<string>();
  isAdminChanged = new EventEmitter<boolean>();
  loggedInChanged = new EventEmitter<boolean>();

  public usernameInput: string;
  public pwdInput: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private user: UserService,
              public locale: LocalizationService) { }

  ngOnInit() {
      this._returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  login(){
    if(this.user.login(this.usernameInput, this.pwdInput)){
      this.usernameChanged.emit(this.username);
      this.isAdminChanged.emit(this.isAdmin);
      this.loggedInChanged.emit(this.loggedIn);
      this.router.navigateByUrl(this._returnUrl);
    }
    this.pwdInput = "";
  }

  logout(){
    this.user.logout();
    this.usernameChanged.emit(this.username);
    this.isAdminChanged.emit(this.isAdmin);
    this.loggedInChanged.emit(this.loggedIn);
  }

}
