import { Injectable, EventEmitter } from '@angular/core';
import { KeyedCollection } from '../KeyedCollection';

@Injectable()
export class LocalizationService {

  private _dictionary: KeyedCollection<string>; 

  get localeList(){
    return [
      {code: 'en', title: 'English'},
      {code: 'he', title: 'עברית'}
    ]
  }

  get locale(){
    return this._locale
  }
  set locale(value: string){
    switch (value.toUpperCase()) {
      case 'EN':
        this._locale = value;
        this._dictionary = buildDictionaryEN();
        
        break;
      case 'HE':
        this._locale = value;
        this._dictionary = buildDictionaryHE();
        break;
      default:
        break;
    }
  }

  constructor(private _locale: string) {  
    this.locale = _locale;
  }


  translate(value: string){
    if(this._dictionary.ContainsKey(value)){
      return this._dictionary.Item(value);
    }
    else{
      return `#${value.toUpperCase()}`;
    }
  }
  
}

function buildDictionaryEN() : KeyedCollection<string>{
  let result: KeyedCollection<string> = new KeyedCollection<string>();
  result.Add('home', 'Home');
  result.Add('about', 'About');
  result.Add('products', 'Products');
  result.Add('category', 'Category');
  result.Add('card', 'Shopping Card');
  result.Add('contact', 'Contact Us');
  result.Add('all', 'All Categories');
  result.Add('welcome', 'Welcome');
  result.Add('logout', 'Logout');
  result.Add('login', 'Login');
  result.Add('username', 'Username');
  result.Add('password', 'Password');
  result.Add('angularshop', 'Angular Shop');
  result.Add('details', 'Details');
  result.Add('close', 'Close');
  result.Add('add', 'Add');
  result.Add('remove', 'Remove');
  

  return result;
}

function buildDictionaryHE() : KeyedCollection<string>{
  let result: KeyedCollection<string> = new KeyedCollection<string>();
  result.Add('home', 'דף הבית');
  result.Add('about', 'אודות');
  result.Add('products', 'מוצרים');
  result.Add('category', 'קטגוריה');
  result.Add('card', 'סל קניות');
  result.Add('contact', 'צור קשר');
  result.Add('all', 'כל הקטגוריות');
  result.Add('welcome', 'שלום');
  result.Add('logout', 'יציאה');
  result.Add('login', 'כניסה');
  result.Add('username', 'שם משתמש');
  result.Add('password', 'סיסמה');
  result.Add('angularshop', 'ברוכים הבאים');
  result.Add('details', 'פרטים');
  result.Add('close', 'סגור');
  result.Add('add', 'הוסף');
  result.Add('remove', 'הוצא');

  return result;
}
