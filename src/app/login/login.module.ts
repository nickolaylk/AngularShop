import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginServiceModule } from './login-service.module';
import { LoginWidgetModule } from './login-widget.module';
import { LoginComponent } from './login-component/login.component';
import { LoginRoutingModule } from './login-routing.module';


@NgModule({
    imports: [
        CommonModule,
        LoginServiceModule,
        LoginWidgetModule,
        LoginRoutingModule
    ]
})
export class LoginModule { }