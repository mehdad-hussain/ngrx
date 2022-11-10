import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';

import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() inputType: string = 'text';
  @Input() placeHolder: string = '';
  @Input() label: string = '';
  @Input() showRequiredMsg: boolean = false;

  // section: input for css classes

  @Input() labelClasses: string = '';
  @Input() inputClasses: string = '';
  @Input() errorTextClasses: string = '';

  @ViewChild('input') input!: ElementRef;

  faStar = faStarOfLife;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  isRequired: boolean = false;
  showPassword: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // console.log(this.control.get('name'));
    if (this.showRequiredMsg) {
      this.isRequired = this.control.hasValidator(Validators.required);
    }
  }

  // ngAfterContentInit(): void {}

  togglePassword() {
    this.input.nativeElement.type =
      this.input.nativeElement.type === 'password' ? 'text' : 'password';
    this.showPassword = !this.showPassword;
  }
}
