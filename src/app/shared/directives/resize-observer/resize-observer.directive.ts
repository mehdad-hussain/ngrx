// prettier-ignore
import { Directive, ElementRef, EventEmitter, OnDestroy, Output, } from '@angular/core';
import { debounceTime, Observable } from 'rxjs';

// section: ResizeObserver API with observer & debounce
class ResizeObservable extends Observable<ResizeObserverEntry[]> {
  constructor(elem: HTMLElement) {
    super((subscriber) => {
      const ro = new ResizeObserver((entries) => {
        subscriber.next(entries);
      });

      // Observe one or multiple elements
      ro.observe(elem);

      return function unsubscribe() {
        ro.unobserve(elem);
        ro.disconnect();
      };
    });
  }
}

@Directive({
  selector: '[resizeObserver]',
})
export class ResizeObserverDirective implements OnDestroy {
  @Output() resizeObserver: EventEmitter<any> = new EventEmitter();
  resizeObserverSubscription$: any;

  constructor(private el: ElementRef) {
    this.startObserver();
  }

  public startObserver() {
    this.resizeObserverSubscription$ = new ResizeObservable(
      this.el.nativeElement
    )
      .pipe(debounceTime(0))
      .subscribe((entries) => {
        this.resizeObserver?.emit(entries[0]);
      });
  }

  public ngOnDestroy(): void {
    this.resizeObserverSubscription$.unsubscribe();
  }
}

// section: ResizeObserver API without observer & debounce

// const entriesMap = new WeakMap();

// const ro = new ResizeObserver((entries) => {
//   for (const entry of entries) {
//     if (entriesMap.has(entry.target)) {
//       const comp = entriesMap.get(entry.target);
//       comp._resizeCallback(entry);
//     }
//   }
// });

// @Directive({
//   selector: '[resizeObserver]',
// })
// export class ResizeObserverDirective implements OnDestroy {
//   @Output() resizeObserver: EventEmitter<any> = new EventEmitter();

//   constructor(private el: ElementRef) {
//     const target = this.el.nativeElement;
//     entriesMap.set(target, this);
//     ro.observe(target);
//   }

//   public _resizeCallback(entry: any) {
//     // console.log(this.el);
//     // console.log('resize callback', entry.contentRect.width);
//     this.resizeObserver.emit(entry);
//   }

//   public ngOnDestroy(): void {
//     const target = this.el.nativeElement;
//     ro.unobserve(target);
//     entriesMap.delete(target);
//   }
// }
