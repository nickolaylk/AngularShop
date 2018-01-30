import {Pipe, PipeTransform} from '@angular/core';
import { LocalizationService } from '../core/localization.service';

@Pipe({name: 'translate', pure: false})
export class LocalPipe implements PipeTransform{
    
    constructor(private _locale: LocalizationService){}
    
    transform(value: string): string {
        return this._locale.translate(value);
    }
}