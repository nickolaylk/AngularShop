import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmButtonDirective } from './confirm-button.directive';
import { LocalPipe } from './local-pipe';



@NgModule({
  declarations: [
    ConfirmButtonDirective,
    LocalPipe
  ],
  exports: [
    ConfirmButtonDirective,
    LocalPipe
  ],
})
export class SharedModule { }
