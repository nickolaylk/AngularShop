import { Component, EventEmitter, Output, Input } from '@angular/core';
import { LocalizationService } from '../common/services/localization.service';
import { ShoppingCardService } from '../common/services/shopping-card.service';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-nav-pane',
  templateUrl: './nav-pane.component.html',
  styleUrls: ['./nav-pane.component.css']
})
export class NavPaneComponent {

  @Input()
  sections: Array<string>;
  
  @Output() 
  navigationRequested = new EventEmitter<string>();

  constructor(public locale: LocalizationService, 
              public card: ShoppingCardService){
  }

  triggerNavigationRequest(section: string) {
    this.navigationRequested.emit(section);
  }
}
