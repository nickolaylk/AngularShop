import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizationService } from '../../core/localization.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  private _returnUrl: string;

  get username(): string{
    return this._login.username;
  }

  get loggedIn(): boolean{
    return this._login.loggedIn;
  }
  
  usernameChanged = new EventEmitter<string>();
  loggedInChanged = new EventEmitter<boolean>();

  public usernameInput: string;
  public pwdInput: string;

  constructor(public locale: LocalizationService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _login: LoginService) { }

  ngOnInit() {
      this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  login(){
    if(this._login.login(this.usernameInput, this.pwdInput)){
      this.usernameChanged.emit(this.username);
      this.loggedInChanged.emit(this.loggedIn);
      this._router.navigateByUrl(this._returnUrl);
    }
    this.pwdInput = "";
  }

  logout(){
    this._login.logout();
    this.usernameChanged.emit(this.username);
    this.loggedInChanged.emit(this.loggedIn);
  }

}
