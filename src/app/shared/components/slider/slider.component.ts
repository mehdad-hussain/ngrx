import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  // section: slide related input
  @Input() slides: any[] = [];

  @Input() containerHeight: string = '';
  @Input() spaceBetween: string = '24px';
  @Input() slidesPerViewObj: { [key: string]: number } = {
    360: 1,
    480: 2,
    640: 3,
    768: 4,
    1024: 5,
    1280: 6,
    // 1536: 7,
  };
  @Input() speed: number = 300;

  @Input() loop: boolean = true;
  @Input() pagination: boolean = true;
  @Input() navigation: boolean = true;

  // section: css class related input
  @Input() wrapperClasses: string = '';
  @Input() mainContainerClasses: string = '';
  @Input() slideClasses: string = '';
  @Input() btnGrpClasses: string = '';

  @ViewChild('nextBtn') nextBtn!: ElementRef;
  @ViewChild('prevBtn') prevBtn!: ElementRef;
  @ViewChild('mainContainer') mainContainer!: ElementRef;

  element!: HTMLElement;

  containerCurrentWidthInRem: number = 0;
  slideWidth: string = '0rem';

  constructor() {}

  ngOnInit(): void {
    // this.getSlideWidth();
  }

  ngAfterViewInit(): void {
    // console.log(this.mainContainer?.nativeElement.offsetWidth);
  }

  prevOnclick() {
    this.element = this.mainContainer.nativeElement;

    let item = this.element?.getElementsByClassName('slideClasses');

    this.element?.prepend(item[item.length - 1]);
  }

  nextOnclick() {
    this.element = this.mainContainer.nativeElement;

    let item = this.element?.getElementsByClassName('slideClasses')[0];

    this.element?.appendChild(item);
  }

  /**idea: https://dev.to/ibn_abubakre/append-vs-appendchild-a4m
   * Element.append() allows you to also append string objects, whereas Node.appendChild() only accepts Node objects.
   * Element.append() has no return value, whereas Node.appendChild() returns the appended Node object.
   * Element.append() can append several nodes and strings, whereas Node.appendChild() can only append one node.
   */

  getSlideWidth($event: any) {
    this.containerCurrentWidthInRem = $event.contentRect.width;
    console.log(this.containerCurrentWidthInRem);
    // return this.containerCurrentWidthInRem;

    let slidesPerView = 5;

    for (const key in this.slidesPerViewObj) {
      if (this.containerCurrentWidthInRem <= +key) {
        slidesPerView = this.slidesPerViewObj[key];
        break;
      } else {
        slidesPerView = this.slidesPerViewObj[1536];
      }
    }

    console.log(slidesPerView);

    let slideWidthInNumber =
      (this.containerCurrentWidthInRem -
        parseFloat(this.spaceBetween.split('px')[0]) * (slidesPerView - 1)) /
      slidesPerView;

    this.slideWidth = slideWidthInNumber + 'px';
    this.element = this.mainContainer.nativeElement;

    console.log(this.slideWidth);
    let item = this.element?.getElementsByClassName('slideClasses');
    for (let i = 0; i < item.length; i++) {
      item[i].setAttribute('style', `width: ${this.slideWidth}`);
    }
    // return the width of the slide
  }
}

// section: ResizeObserver usage without directive

// console.log(this.getContainerWidth());

// let obs = new ResizeObserver((entries) => {
//   // console.log(entries[0].contentRect.width);
//   let width: number = entries[0].contentRect.width;
//   // for (let entry of entries) {
//   //   // cr = entry.contentRect;
//   //   // console.log(cr);
//   //   // cr.width;
//   //   console.log(entry.contentRect.width);
//   // }
//   // console.log(width);
//   return width;
// });
// obs.observe(this.mainContainer.nativeElement);
