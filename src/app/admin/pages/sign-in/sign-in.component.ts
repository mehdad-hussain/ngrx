import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core';
import { first, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  currentUser,
  login,
  logout,
  AppState,
  error,
  signInStatus,
} from '@store';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public signInForm!: FormGroup;
  public addMobileForm!: FormGroup;
  public addOtpForm!: FormGroup;
  public addNewPasswordForm!: FormGroup;

  screenSize = 0;
  returnUrl: string = '/branch/list';
  submitted: boolean = false;

  signinPage: boolean = true;
  addMobilePage: boolean = false;
  addOtpPage: boolean = false;
  addNewPassPage: boolean = false;

  remainingTime: number = 60;
  disableResend: boolean = true;
  resendTimerStart: boolean = false;

  hasChanges: boolean = false;

  currentData: any;

  user$ = this.store.select(currentUser);
  status$ = this.store.select(signInStatus);

  error$ = this.store.select(error);

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.signInForm = this._fb.group({
      mobile: [null, [Validators.required]],
      // , Validators.minLength(11), Validators.maxLength(14)
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
      remember: [],
    });

    this.user$.subscribe((user) => {
      if (user) {
        console.log('user', user);
      }
    });
    console.log(this.user$);
  }

  signIn() {
    let credentials = {
      mobile: this.signInForm.value.mobile,
      password: this.signInForm.value.password,
      remember: this.signInForm.value.remember,
    };

    this.store.dispatch(login({ credentials }));
  }

  // async signIn() {
  //   try {
  //     this.submitted = true;
  //     if (!isNaN(+this.signInForm.controls['mobile'].value)) {
  //       // if (!regExpMobile.test(this.signInForm.value.mobile)) {
  //       //   this.toast.warning('Enter valid mobile number');
  //       //   return;
  //       // }

  //       if (
  //         !this.signInForm.value.password ||
  //         this.signInForm.value.password === '' ||
  //         this.signInForm.value.password.length < 6
  //       ) {
  //         // this.toast.warning('Enter password at least 6 characters long');
  //         return;
  //       }

  //       if (!this.signInForm.value.mobile.toString().startsWith('+88')) {
  //         this.signInForm.controls['mobile'].setValue(
  //           '+88' + this.signInForm.value.mobile
  //         );
  //       }
  //     }

  //     if (this.signInForm.invalid) {
  //       return;
  //     }

  //     console.log(this.signInForm.value);

  //     // this.spinner.show();
  //     // this.authService
  //     //   .login(
  //     //     this.signInForm.value.mobile,
  //     //     this.signInForm.value.password,
  //     //     this.signInForm.value.remember
  //     //   )
  //     //   .pipe(first())
  //     //   .subscribe((res: any) => {
  //     //     // this.spinner.hide();
  //     //     if (res.Success) {
  //     //       // this.toast.success('Logged in');
  //     //       console.log(this.returnUrl);
  //     //       this.router.navigateByUrl('/branch/list');
  //     //     } else {
  //     //       // this.toast.error(res.Message);
  //     //     }
  //     //   });

  //     this.store.dispatch(
  //       login({
  //         mobile: this.signInForm.value.mobile,
  //         password: this.signInForm.value.password,
  //         remember: this.signInForm.value.remember,
  //       })
  //     );
  //   } catch (e: any) {
  //     // this.spinner.hide();
  //     // this.toast.error(e);
  //     console.log(e);
  //   }
  // }
}
