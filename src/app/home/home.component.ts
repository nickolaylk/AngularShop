import { Component } from '@angular/core';
import { LocalizationService } from '../common/services/localization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  constructor(public locale: LocalizationService) { }

}
