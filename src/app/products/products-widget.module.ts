import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products-component/products.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductBase } from './product-base';
import { ProductViewBase } from './product-view-base';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductFullComponent } from './product-full/product-full.component';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';


@NgModule({
    imports: [
        CommonModule, 
        FormsModule, 
        SharedModule,
        ProductsRoutingModule
    ],
    declarations: [
        ProductsComponent,
        ProductComponent,
        ProductListComponent,
        ProductFullComponent,
        ProductAddEditComponent
    ],
    exports: [
        ProductsComponent,
        ProductComponent,
        ProductListComponent,
        ProductFullComponent,
        ProductAddEditComponent
    ]
})
export class ProductsWidgetModule { }