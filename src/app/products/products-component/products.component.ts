import { Component} from '@angular/core';
import { LocalizationService } from '../../core/localization.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(public locale: LocalizationService,
              private _route: ActivatedRoute,
              private _router: Router) { }
}
