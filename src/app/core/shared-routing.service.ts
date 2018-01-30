import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Scope } from './scope.enum';
import { ScopePage } from './scope-page.enum';
import { error } from 'util';
import { SharedRoute } from './shared-route';
import { rootRenderNodes } from '@angular/core/src/view/util';

@Injectable()
export class SharedRoutingService {
    private _routes: SharedRoute[] = new Array<SharedRoute>();
    
    constructor(private _route: ActivatedRoute,
                private _router: Router){ }

    setRoute(scope: Scope, page: ScopePage, path: string){
        let route = this._routes.find(r => r.scope === scope && r.page === page);

        if(route){
            route.path = path;
        }
        else{
            route = new SharedRoute();
            route.scope = scope;
            route.page = page;
            route.path = path;

            this._routes.push(route);
        }
    }

    navigate(scope: Scope, page: ScopePage, ... params: string[]){
        let route = this._routes.find(r => r.scope === scope && r.page === page);
        if(route){
            this._router.navigate([route.path, ...params ]);
        }
        else{
            this._router.navigate(['**']);
        }
    }
}