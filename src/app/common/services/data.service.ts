import { Injectable } from '@angular/core';
import { Category } from '../../model/category';
import { Product } from '../../model/product';


@Injectable()
export class DataService {

  private readonly categories: Array<Category> = null;
  private readonly products: Array<Product> = null;

  constructor(categoriesCount: number){
    this.categories = generateCategories(categoriesCount);
    this.products = generateProducts(this.categories);
  }
  
  getCategories(): Array<Category>{
    return this.categories;
  }

  getProducts(category?: Category){
    
    if(category){
      let result: Array<Product> = new Array<Product>();
      this.products.forEach((p) => {
        if(p.categoryId === category.id){
          result.push(p);
        }
      });
      return result;
    }
    else{
      return this.products;
    }
  }

  addProduct(product: Product){
    if(this.products.indexOf(product) <= 0){
      this.products.push(product);
    }
  }

  deleteProduct(product: Product){
    let index = this.products.indexOf(product);

    if(index >= 0){
      delete this.products[index];
      this.products.splice(index, 1);
    }
  }

  updateProduct(target: Product, newData: Product){
    for(let property in newData){
      target[property] = newData[property];
    }
  }
}

function generateCategories(count: number): Array<Category>{
  let result = new Array<Category>();
  for(let i=0; i < count; i++){
      let category = new Category(i, `Category-${i}`);
      result.push(category);
  }
  return result;
}

function generateProducts(categories: Array<Category>) :Array<Product>{
  let count = getRandomInt(10, 25);
  let result = new Array<Product>();

  for(let i=0; i < count; i++){
      let category : Category = categories[getRandomInt(0, categories.length)];
      let product = new Product();
      product.categoryId = category.id;
      product.title = `Product #${i}`
      product.description = `Description for #${i}. Related to ${category.title}`;
      product.price = getRandomArbitrary(10, 1000).toFixed(2);
      product.image = `../assets/images/${category.title.toLowerCase()}.jpg`;

      result.push(product);
  }

  return result;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
