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
                private _notificationService: NotificationService) {
        
        this.loadCategories();
        this.loadProducts();        
    }

    getCategory(id: number): Promise<Category>{
        return this._categories
        .pipe(
            filter(o => o.length > 0),
            map(o => o.find(c => c.id === id)),
            take(1)
        )
        .toPromise();
    }

    getProducts(categoryId?: number): Promise<Product[]>{
        return this._products
        .pipe(
            filter(o => o.length > 0),
            map(o=>{
                let result = o.filter(p => categoryId == null ? true : p.categoryId === categoryId);
                return result;
            })
            
        )
        .toPromise();
    }

    getProduct(id: number): Promise<Product>{
        return this._products
        .pipe(
            filter(o => o.length > 0),
            map(o => o.find(p => p.id === id)),
            take(1)
        )
        .toPromise();
    }

    addProduct(product: Product){
        return this._dataApi.saveProduct(product)
            .then(savedProduct => {
                this._products.value.push(savedProduct);
                this.productsChanged.emit(this.products);
            })
            .catch(error => {
                this._notificationService.notify(error);
            });
    }

    updateProduct(target: Product, newData: Product){
        return this._dataApi.saveProduct(newData)
            .then(savedProduct => {
                
                for(let property in savedProduct){
                    target[property] = savedProduct[property];
                }

                this.productsChanged.emit(this.products);
            })
            .catch(error => {
                this._notificationService.notify(error);
            });
    }

    deleteProduct(product: Product){
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
                this._notificationService.notify(error);
            });
    }

    private loadCategories(){
        this._dataApi.getCategories()
            .then(c => {
                this._categories.next(c);
                this.categoriesChanged.emit(this.categories);
            })
            .catch(error => {
                this._notificationService.notify(error);
            });
    }

    private loadProducts(){
        this._dataApi.getProducts()
            .then(p => {
                this._products.next(p);
                this.productsChanged.emit(this.products);
            })
            .catch(error => {
                this._notificationService.notify(error);
            });
    }
}