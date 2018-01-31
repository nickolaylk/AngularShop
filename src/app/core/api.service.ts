import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './model/category';
import { Product } from './model/product';
import { map, catchError } from 'rxjs/operators';
import { filter } from 'rxjs/operators/filter';


@Injectable()
export class ApiService {
    private readonly _baseApiUrl = './api/';
    private readonly _errorMessage = 'An error has occurred';
    private _nextProductId = -1;
    constructor(private _http: HttpClient) { }

    getCategories(): Promise<Category[]>{
        
        return this._http.get(this.apiUrl('categories.json'))
            .pipe(
                map(json => {
                    return json as Category[];
                }),
            )
            .toPromise()
            .catch(error => Promise.reject(`Could not get categories. ${error.message}`));
    }

    getProducts(): Promise<Product[]>{
        
        return this._http.get(this.apiUrl('products.json'))
            .pipe(
                map(json => {
                    let products = json as Product[];
                    this._nextProductId = Math.max(...products.map(p => p.id)) + 1;
                    return products;
                }),
            )
            .toPromise()
            .catch(error => Promise.reject(`Could not get products. ${error.message}`));
    }

    saveProduct(product: Product): Promise<Product>{
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    if(product.id === 0){
                        product.id = this._nextProductId++;
                    }
                    resolve(product);
                }, 300)
            }
        )
    }

    deleteProduct(product: Product): Promise<Product>{
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(product);
                }, 300)
            }
        )
    }

    private apiUrl(action: string) {
        return `${this._baseApiUrl}${action}`;
    }
}