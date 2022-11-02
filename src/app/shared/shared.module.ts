import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// import: local imports
import { HeaderComponent, FooterComponent } from './layout';
import { ClickOutsideDirective } from './directives';
// prettier-ignore
import { SplitPipe, SumPipe, TypeOfPipe, ReversePipe, LengthPipe, SentenceCasePipe, SlugifyPipe, SomePipe, SqrtPipe, PowPipe, PctPipe, MinPipe, MaxPipe, MapPipe, LastPipe, JoinPipe, FirstPipe, FillPipe, EveryPipe, CopyWithinPipe, CombinePipe, CharAtPipe, CamelCasePipe, ConcatPipe, InterpolatePipe, PascalCasePipe, RepeatPipe, TrimPipe, TrimLeftPipe, TrimRightPipe, TruncatePipe, AvgPipe, AbsPipe, CeilPipe, FloorPipe, RoundPipe } from './pipes';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    // pipes
    SplitPipe,
    // directives
    ClickOutsideDirective,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    // export: local files components
    HeaderComponent,
    FooterComponent,

    // export: local files directives
    ClickOutsideDirective,

    // export: local files pipes
    SplitPipe,
  ],
})
export class SharedModule {}
