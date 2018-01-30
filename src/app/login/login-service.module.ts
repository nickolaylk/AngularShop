import { NgModule, Optional, SkipSelf } from '@angular/core';
import { LoginService } from './login.service';


@NgModule({
    providers: [ LoginService ]
})
export class LoginServiceModule {
    constructor(@Optional() @SkipSelf() parentModule: LoginServiceModule) {
        if (parentModule) {
            throw new Error(`LoginServiceModule has already been loaded. Import core modules in AppModule only.`);
        }
    }
}