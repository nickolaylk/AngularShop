import {Pipe, PipeTransform} from '@angular/core';
import { LocalizationService } from './services/localization.service';

@Pipe({name: 'translate', pure: false})
export class LocalPipe implements PipeTransform{
    constructor(private locale: LocalizationService){}
    transform(value: string): string {
        return this.locale.translate(value);
    }
}