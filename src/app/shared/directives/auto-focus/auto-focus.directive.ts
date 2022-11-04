import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[autofocus]',
})
export class AutofocusDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
  }

  /**idea:
   * In the above code, we have created a directive “autofocus” here “autofocus” is the name/selector of this directive, and
   * whenever we want to use this directive we have to provide the selector.
   * We are using the angular “ngAfterViewInit” lifecycle hook that makes the element focused after view initialization.
   */
}
