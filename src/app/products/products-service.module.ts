import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ProductsService } from './products.service';


@NgModule({
    providers: [ ProductsService ]
})
export class ProductsServiceModule {
    constructor(@Optional() @SkipSelf() parentModule: ProductsServiceModule) {
        if (parentModule) {
            throw new Error(`ProductsServiceModule has already been loaded. Import core modules in AppModule only.`);
        }
    }
}