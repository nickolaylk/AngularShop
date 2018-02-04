import { Product } from "./product";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export class User{
    username: string;
    features:Array<string>;
    permissions:Array<string>;
    cart: BehaviorSubject<Product[]>;
}