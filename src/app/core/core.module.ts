import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AdminGuard } from './admin.guard';
import { UserService } from './user.service';
import { DataService } from './data.service';
import { CartAvailableGuard } from './cart-available-guard';
import { LocalizationService } from './localization.service';
import { SharedRoutingService } from './shared-routing.service';

const dataServiceFactory = () => new DataService(5);
const localeServiceFactory = () => new LocalizationService('en');


@NgModule({
    providers: [
        {provide: LocalizationService, useFactory: localeServiceFactory},
        {provide: DataService, useFactory: dataServiceFactory},
        UserService, 
        SharedRoutingService,
        AdminGuard,
        CartAvailableGuard
    ],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(`CoreModule has already been loaded. Import core modules in AppModule only.`);
        }
    }
}