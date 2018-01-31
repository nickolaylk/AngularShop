import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products-component/products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedRoutingService } from '../core/shared-routing.service';
import { Scope } from '../core/scope.enum';
import { ScopePage } from '../core/scope-page.enum';
import { ProductFullComponent } from './product-full/product-full.component';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
import { AdminGuard } from '../core/admin.guard';


const routes: Routes = [
    { path: 'products', component: ProductsComponent,
    children: [
        { path: '', redirectTo: 'list', pathMatch: 'full'},
        { path: 'list', component: ProductListComponent},
        { path: 'list/:categoryId', component: ProductListComponent},
        { path: 'details/:id', component: ProductFullComponent},
        { path: 'edit/:id', component: ProductAddEditComponent, canActivate: [AdminGuard] },
        { path: 'add', component: ProductAddEditComponent, canActivate: [AdminGuard] }
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
    constructor(private _sharedRoutingService: SharedRoutingService){
        this._sharedRoutingService.setRoute(Scope.products, ScopePage.list, '/products/list');
        this._sharedRoutingService.setRoute(Scope.products, ScopePage.details, '/products/details');
        this._sharedRoutingService.setRoute(Scope.products, ScopePage.add, '/products/add');
        this._sharedRoutingService.setRoute(Scope.products, ScopePage.editor, '/products/edit');
    }
}
