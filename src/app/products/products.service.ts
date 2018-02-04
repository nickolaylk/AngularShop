import { Injectable, EventEmitter } from '@angular/core';
import { UserService } from '../core/user.service';
import { Category } from '../core/model/category';
import { Product } from '../core/model/product';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter, map, take, first } from 'rxjs/operators';
import { ApiService } from '../core/api.service';
import { NotificationService } from '../core/notification.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductsService {

    private  _categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
    private _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

    get categories(): Observable<Category[]>{
        return this._categories.asObservable();
    }

    get products(): Observable<Product[]>{
        return this._products.asObservable();
    }

    productsChanged: EventEmitter<Observable<Product[]>> = new EventEmitter<Observable<Product[]>>();
    categoriesChanged: EventEmitter<Observable<Category[]>> = new EventEmitter<Observable<Category[]>>();

    constructor(private _dataApi: ApiService,
                private _user: UserService,
                private _notifications: NotificationService) {
        
        this.loadCategories();
        this.loadProducts();
    }

    getCategory(id: number): Promise<Category>{
        this._notifications.notify(`ProductsService: get category id:${id}`);
        return this._categories
        .pipe(
            filter(o => o.length > 0),
            map(o => o.find(c => c.id === id)),
            take(1)
        )
        .toPromise();
    }

    getProduct(id: number): Promise<Product>{
        this._notifications.notify(`ProductsService: get product id:${id}`);
        return this._products
        .pipe(
            filter(o => o.length > 0),
            map(o => o.find(p => p.id === id)),
            take(1)
        )
        .toPromise();
    }

    addProduct(product: Product){
        this._notifications.notify(`ProductsService: add product ${product ? product.title : 'n/a'}`);
        return this._dataApi.saveProduct(product)
            .then(savedProduct => {
                this._products.value.push(savedProduct);
                this.productsChanged.emit(this.products);
            })
            .catch(error => {
                this._notifications.notify(`ProductsService: error at adding product: ${error}`);
            });
    }

    updateProduct(target: Product, newData: Product){
        this._notifications.notify(`ProductsService: update product id:${target ? target.id : 'n/a'}`);
        return this._dataApi.saveProduct(newData)
            .then(savedProduct => {
                
                for(let property in savedProduct){
                    target[property] = savedProduct[property];
                }
                this.productsChanged.emit(this.products);
            })
            .catch(error => {
                this._notifications.notify(`ProductsService: error at updating product: ${error}`);
            });
    }

    deleteProduct(product: Product){
        this._notifications.notify(`ProductsService: delete product id:${product ? product.id : 'n/a'}`);
        return this._dataApi.deleteProduct(product)
            .then(deletedProduct => {
                let index = this._products.value.indexOf(product);

                if(index >= 0){
                    delete this._products[index];
                    this._products.value.splice(index, 1);
                }
                this.productsChanged.emit(this.products);
            })
            .catch(error => {
                this._notifications.notify(`ProductsService: error at deleting product: ${error}`);
            });
    }

    private loadCategories(){
        this._dataApi.getCategories()
            .then(c => {
                this._categories.next(c);
                this.categoriesChanged.emit(this.categories);
            })
            .catch(error => {
                this._notifications.notify(`ProductsService: error at loading categories: ${error}`);
            });
    }

    private loadProducts(){
        this._dataApi.getProducts()
            .then(p => {
                this._products.next(p);
                this.productsChanged.emit(this.products);
            })
            .catch(error => {
                this._notifications.notify(`ProductsService: error at loading products: ${error}`);
            });
    }
}