import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AdminGuard } from './admin.guard';
import { UserService } from './user.service';
import { CartAvailableGuard } from './cart-available-guard';
import { LocalizationService } from './localization.service';
import { SharedRoutingService } from './shared-routing.service';
import { NotificationService } from './notification.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpCorrelationInterceptor } from './http-correlation-interceptor';
import { ApiService } from './api.service';

const localeServiceFactory = () => new LocalizationService('en');

@NgModule({
    providers: [
        {provide: LocalizationService, useFactory: localeServiceFactory},
        ApiService,
        UserService, 
        SharedRoutingService,
        NotificationService,
        AdminGuard,
        CartAvailableGuard,
        { provide: HTTP_INTERCEPTORS, useClass: HttpCorrelationInterceptor, multi: true }
    ],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule, 
            private _notifications: NotificationService) {
        if (parentModule) {
            throw new Error(`CoreModule has already been loaded. Import core modules in AppModule only.`);
        }

        this._notifications.notifications.subscribe(msg => console.log(msg));
    }
}