import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropDownDirective {

  @HostBinding('class.open') isOpen = false;

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef) {
  }

  // @HostListener('click')
  // public toggleOpen(event) {
  //   this.isOpen = !this.isOpen;
  // }

  @HostListener('document:click', ['$event'])
  public toggleOpen(event: Event) {
    this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    // console.log(event);
    // console.log(this.elementRef);

    // console.log(this.elementRef.nativeElement.contains(event.target));
  }

}
