import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'svg-loading-process',
  template: `
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="399.389px"
      height="399.389px"
      viewBox="0 0 399.389 399.389"
      style="enable-background:new 0 0 399.389 399.389;"
      xml:space="preserve"
      [class]="classes"
      [attr.fill]="fill ? fill : 'currentColor'"
      [attr.stroke]="stroke ? stroke : 'none'"
      [attr.stroke-width]="strokeWidth"
    >
      <!-- color of attribute properties must be hex or rgb color as it's can't get color from css class -->
      <g>
        <path
          d="M340.896,58.49C303.18,20.773,253.031,0.001,199.693,0.001c-53.34,0-103.487,20.771-141.204,58.489
		C20.772,96.208,0,146.355,0,199.694c0,53.34,20.772,103.489,58.49,141.206c37.717,37.717,87.864,58.488,141.204,58.488
		c53.339,0,103.486-20.771,141.205-58.488c37.717-37.717,58.49-87.865,58.49-141.206C399.387,146.355,378.613,96.208,340.896,58.49z
		 M321.93,199.694c0,67.401-54.836,122.236-122.237,122.236S77.457,267.096,77.457,199.694S132.292,77.458,199.693,77.458
		S321.93,132.293,321.93,199.694z M328.061,71.327c3.352,3.353,6.553,6.817,9.607,10.379l-29.262,29.262
		c-25.766-31.512-64.928-51.664-108.713-51.664c-4.593,0-9.134,0.229-13.615,0.662V18.655c4.508-0.332,9.049-0.5,13.615-0.5
		C248.184,18.155,293.771,37.038,328.061,71.327z"
        />
      </g>
    </svg>
  `,
  styles: [``],
})
export class LoadingProcessComponent implements OnInit {
  @Input() classes: string = '';
  @Input() stroke: string = '';
  @Input() strokeWidth: string = '';
  @Input() fill: string = '';

  constructor() {}

  ngOnInit(): void {}
}
