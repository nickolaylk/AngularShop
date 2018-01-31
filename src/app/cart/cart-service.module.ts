import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CartService } from './cart.service';


@NgModule({
    providers: [ CartService ]
})
export class CartServiceModule {
    constructor(@Optional() @SkipSelf() parentModule: CartServiceModule) {
        if (parentModule) {
            throw new Error(`CartServiceModule has already been loaded. Import core modules in AppModule only.`);
        }
    }
}