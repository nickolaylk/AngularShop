import { Component} from '@angular/core';
import { LocalizationService } from '../common/services/localization.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent{

  constructor(public locale: LocalizationService) { }

}
