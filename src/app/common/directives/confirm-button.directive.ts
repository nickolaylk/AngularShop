import { Directive } from '@angular/core';
import { Input, Output, HostListener, EventEmitter, ElementRef } from '@angular/core';


@Directive({
  selector: '[appConfirmButton]'
})
export class ConfirmButtonDirective {

  constructor(private el: ElementRef) { }
  
  @Input()
  promptText: string;

  @Output()
  onConfirm: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();
  @Output()
  onDecline: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

  @HostListener('click', ['$event'])

  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    
    if(confirm(this.promptText)){
      this.onConfirm.emit(this.el);
    }
    else {
      this.onDecline.emit(this.el);
    }
  }

}
