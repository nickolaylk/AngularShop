export class Category{
    get id(): number{
        return this._id;
    }

    get title(): string{
        return this._title;
    }

    constructor(private readonly _id: number, private _title: string){}
}
