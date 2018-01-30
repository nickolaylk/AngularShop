import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsServiceModule } from './products-service.module';


@NgModule({
    imports: [
        CommonModule,
        ProductsServiceModule
    ]
})
export class ProductsModule { }