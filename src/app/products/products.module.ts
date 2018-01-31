import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsServiceModule } from './products-service.module';
import { ProductsWidgetModule } from './products-widget.module';


@NgModule({
    imports: [
        CommonModule,
        ProductsServiceModule,
        ProductsWidgetModule
    ]
})
export class ProductsModule { }