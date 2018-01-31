import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationService {
    private readonly _notifications = new Subject<string>();
    notifications = this._notifications.asObservable();

    notify(msg: string) {
        this._notifications.next(msg);
    }
}
