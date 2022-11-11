import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toggle-theme-btn',
  templateUrl: './toggle-theme-btn.component.html',
  styleUrls: ['./toggle-theme-btn.component.scss'],
})
export class ToggleThemeBtnComponent implements OnInit {
  selectedTheme = JSON.parse(localStorage.getItem('theme')!);

  userTheme: string = '';
  systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

  @Input() btnClasses: string = '';

  constructor() {
    this.userTheme = this.selectedTheme ? this.selectedTheme : '';
    // console.log('this.userTheme', this.userTheme);

    this.checkCurrentTheme();
  }

  ngOnInit(): void {}

  toggleTheme() {
    this.userTheme = this.userTheme === 'light' ? 'dark' : 'light';

    localStorage.setItem('theme', JSON.stringify(this.userTheme));

    if (this.userTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  checkCurrentTheme() {
    // console.log(this.systemTheme);
    // console.log(this.userTheme);
    if (
      this.userTheme === 'dark' ||
      (this.userTheme === '' && this.systemTheme)
    ) {
      document.documentElement.classList.add('dark');
      this.userTheme = 'dark';
      return;
    }
  }
}
