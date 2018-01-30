import { Scope } from "./scope.enum";
import { ScopePage } from "./scope-page.enum";

export class SharedRoute{
    scope: Scope;
    page: ScopePage;
    path: string;
}