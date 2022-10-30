import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import: local imports
// prettier-ignore
import { SplitPipe, ClickOutsideDirective, HeaderComponent, FooterComponent, } from '@shared';

@NgModule({
  declarations: [
    ClickOutsideDirective,
    SplitPipe,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [CommonModule],
})
export class SharedModule {}
