import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// import: local imports
// prettier-ignore
import { HeaderComponent, FooterComponent,CounterComponent,CounterButtonsComponent,CounterOutputComponent,CustomCounterInputComponent } from './layout';
import { ClickOutsideDirective } from './directives';
// prettier-ignore
import { SplitPipe, SumPipe, TypeOfPipe, ReversePipe, LengthPipe, SentenceCasePipe, SlugifyPipe, SomePipe, SqrtPipe, PowPipe, PctPipe, MinPipe, MaxPipe, MapPipe, LastPipe, JoinPipe, FirstPipe, FillPipe, EveryPipe, CopyWithinPipe, CombinePipe, CharAtPipe, CamelCasePipe, ConcatPipe, InterpolatePipe, PascalCasePipe, RepeatPipe, TrimPipe, TrimLeftPipe, TrimRightPipe, TruncatePipe, AvgPipe, AbsPipe, CeilPipe, FloorPipe, RoundPipe } from './pipes';

@NgModule({
  declarations: [
    // components
    HeaderComponent,
    FooterComponent,
    CounterComponent,
    CounterButtonsComponent,
    CounterOutputComponent,
    CustomCounterInputComponent,
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
    CounterComponent,

    // export: local files directives
    ClickOutsideDirective,

    // export: local files pipes
    SplitPipe,
  ],
})
export class SharedModule {}
