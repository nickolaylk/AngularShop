import { Injectable, EventEmitter } from '@angular/core';
import { DataService } from '../core/data.service';
import { UserService } from '../core/user.service';
import { Category } from '../core/model/category';
import { Product } from '../core/model/product';


@Injectable()
export class ProductsService {

    private readonly _categories: Array<Category> = null;
    private _products: Array<Product> = [];
    private _category = null;

    get categories(){
        return this._categories;
    }

    get products(){
        return this._products;
    }

    productsChanged: EventEmitter<Array<Product>> = new EventEmitter<Array<Product>>();

    constructor(private _data: DataService,
                private _user: UserService) {
        this._categories = this._data.getCategories();
    }

    loadProducts(category?: Category){
        this._category = category;
        this._products = this._data.getProducts(category);
        this.productsChanged.emit(this._products);
    }

    getProduct(id: number): Product{
        let product: Product = this._products.find(p => p.id === id);
        
        if(product == null){
            product = this._data.getProduct(id);
        }

        return product;
    }

    addProduct(product: Product){
        this._data.addProduct(product);
        this.productsChanged.emit(this._products);
    }

    updateProduct(target: Product, newData: Product){
        this._data.updateProduct(target, newData);
        this.productsChanged.emit(this._products);
    }

    deleteProduct(product: Product){
        this._data.deleteProduct(product);
        this.productsChanged.emit(this._products);
    }
}