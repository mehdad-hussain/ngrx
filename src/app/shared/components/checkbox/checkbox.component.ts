import { Component, forwardRef, Input, OnInit } from '@angular/core';
// prettier-ignore
import { ControlValueAccessor, FormControl, Form, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  // Step 1: copy paste this providers property
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})

// Step: 2: Add "implements ControlValueAccessor"
export class CheckboxComponent implements ControlValueAccessor, OnInit {
  @Input() control: FormControl = new FormControl();

  // Step 3: Copy paste this stuff here
  onChange: any = () => {};
  onTouch: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  constructor() {}

  ngOnInit() {
    console.log(this.control.value);
    this.checked = this.control.value;
  }

  // Step 4: Define what should happen in this component, if something changes outside
  checked: boolean = false;
  writeValue(checked: boolean) {
    this.checked = checked;
  }

  onModelChange(e: boolean) {
    // Step 5a: bind the changes to the local value
    this.checked = e;

    // Step 5b: Handle what should happen on the outside, if something changes on the inside
    this.onChange(this.control.setValue(e));
  }
}
