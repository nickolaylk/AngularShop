import { Injectable } from '@angular/core';
import { Category } from '../../model/category';
import { Product } from '../../model/product';


@Injectable()
export class DataService {

  private readonly _categories: Array<Category> = null;
  private readonly _products: Array<Product> = null;

  constructor(categoriesCount: number){
    this._categories = this.generateCategories(categoriesCount);
    this._products = this.generateProducts(this._categories);
  }
  
  getCategories(): Array<Category>{
    return this._categories;
  }

  getProducts(category?: Category){
    
    if(category){
      let result: Array<Product> = new Array<Product>();
      this._products.forEach((p) => {
        if(p.categoryId === category.id){
          result.push(p);
        }
      });
      return result;
    }
    else{
      return this._products;
    }
  }

  getProduct(id: number): Product{
    return this._products.find(p => p.id === id);
  }

  addProduct(product: Product){
    if(this._products.indexOf(product) <= 0){
      this._products.push(product);
    }
  }

  deleteProduct(product: Product){
    let index = this._products.indexOf(product);

    if(index >= 0){
      delete this._products[index];
      this._products.splice(index, 1);
    }
  }

  updateProduct(target: Product, newData: Product){
    for(let property in newData){
      target[property] = newData[property];
    }
  }

  getNewProductId(): number{
    return Math.max(...this._products.map(p => p.id)) + 1;
  }

  private generateCategories(count: number): Array<Category>{
    let result = new Array<Category>();
    for(let i=0; i < count; i++){
        let category = new Category(i, `Category-${i}`);
        result.push(category);
    }
    return result;
  }
  
  private generateProducts(categories: Array<Category>) :Array<Product>{
    let count = this.getRandomInt(10, 25);
    let result = new Array<Product>();
  
    for(let i=0; i < count; i++){
        let category : Category = categories[this.getRandomInt(0, categories.length)];
        let product = new Product();
        product.id = i;
        product.categoryId = category.id;
        product.title = `Product #${i}`
        product.description = `Description for #${i}. Related to ${category.title}`;
        product.price = this.getRandomArbitrary(10, 1000).toFixed(2);
        product.image = `../assets/images/${category.title.toLowerCase()}.jpg`;
  
        result.push(product);
    }
  
    return result;
  }
  
  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  private getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
}


