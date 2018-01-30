import { Product } from "./product";

export class User{
    username: string;
    features:Array<string>;
    permissions:Array<string>;
    cart: Array<Product>;
}