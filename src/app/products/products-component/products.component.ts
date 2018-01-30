import { Component} from '@angular/core';
import { LocalizationService } from '../../core/localization.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(public locale: LocalizationService) { }
}
