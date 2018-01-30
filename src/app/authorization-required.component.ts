import { Component } from '@angular/core';

@Component({
    selector: 'app-authorization-required',
    template: `<h3>{{'authorization required' | translate}}</h3>
            <br/>
            <span>{{'login as authorized user' | translate}}</span>`,
})
export class AuthorizationRequiredComponent { }