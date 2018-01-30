import { Component } from '@angular/core';
import { LocalizationService } from '../core/localization.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent{

  constructor(public locale: LocalizationService) { }


}
