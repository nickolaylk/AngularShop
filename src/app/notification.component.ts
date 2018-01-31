import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';
import { NotificationService } from './core/notification.service';

@Component({
    selector: 'app-notification',
    template: `
        <div [@appear]="appearState">
            <span>{{ notifications | async }}</span>
        </div>
    `,
    styles: ['div { margin: 5px; padding: 5px; font-size: small; }'],
    animations: [
        trigger('appear', [
            state('active', style({opacity: 1, display: 'block'})),
            state('inactive', style({opacity: 0, display: 'none'})),
            transition('inactive => active', [
              animate(500, keyframes([
                style({opacity: 0, display: 'block', offset: 0}),
                style({opacity: 1, offset: 1})
              ]))
            ]),
            transition('active => inactive', animate(500))
          ])
    ],
})
export class NotificationComponent implements OnDestroy {
    appearState = 'inactive';
    subscription: Subscription;

    get notifications() {
        return this._notificationService.notifications;
    }

    constructor(private _notificationService: NotificationService) {
        this.subscription = this._notificationService.notifications
            .subscribe(o => this.activate());
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private activate() {
        this.appearState = 'active';
        setTimeout(() => this.appearState = 'inactive', 3000);
    }
}
