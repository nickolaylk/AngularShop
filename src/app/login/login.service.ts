import { Injectable, EventEmitter } from '@angular/core';
import { UserService } from '../core/user.service';

@Injectable()
export class LoginService {

    get loggedIn(): boolean{
        return this._user.loggedIn;
    }

    get username(): string{
        return this._user.username;
    }

    usernameChanged = new EventEmitter<string>();
    loggedInChanged = new EventEmitter<boolean>();

    constructor(private _user: UserService) {
        this._user.loggedInChanged.subscribe(v => {
            this.loggedInChanged.emit(v);
        });
        this._user.usernameChanged.subscribe(v => {
            this.usernameChanged.emit(v);
        });
    }

    login(username: string, pwd: string): boolean{
        return this._user.login(username, pwd);
    }

    logout(){
        this._user.logout();
    }
}