// prettier-ignore
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface RadioButtonItem {
  name: string;
  value: boolean;
}

export const RADIO_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioBtnComponent),
  multi: true,
};

let nextUniqueId = 0;

@Component({
  selector: 'app-radio-btn',
  templateUrl: './radio-btn.component.html',
  styleUrls: ['./radio-btn.component.scss'],
  providers: [RADIO_VALUE_ACCESSOR],
})
export class RadioBtnComponent implements ControlValueAccessor {
  private _name: string = `group-${nextUniqueId++}`;

  @Input() items!: Array<RadioButtonItem>;
  @Input() label: string = '';

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  private innerValue!: string | number | boolean;
  get value(): string | number | boolean {
    return this.innerValue;
  }

  set value(v: string | number | boolean) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.change(v);
    }
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: string | number | boolean) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouch = fn;
  }

  change(value: string | number | boolean) {
    console.log(this.onChange);
    this.innerValue = value;
    this.onChange(value);
    this.onTouch(value);
  }
}
