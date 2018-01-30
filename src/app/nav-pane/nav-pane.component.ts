import { Component, EventEmitter, Output, Input } from '@angular/core';
import { LocalizationService } from '../core/localization.service';
import { UserService } from '../core/user.service';


@Component({
  selector: 'app-nav-pane',
  templateUrl: './nav-pane.component.html',
  styleUrls: ['./nav-pane.component.css']
})
export class NavPaneComponent {

  @Input()
  sections: Array<string>;
  
  constructor(public locale: LocalizationService, 
              public user: UserService){
  }

  logout(){
    this.user.logout();
  }
}
