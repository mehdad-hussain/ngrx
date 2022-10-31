import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import: local imports
import { HeaderComponent, FooterComponent } from '@shared';
import { ClickOutsideDirective } from '@shared';
// prettier-ignore
import { SplitPipe, SumPipe, TypeOfPipe, ReversePipe, LengthPipe, SentenceCasePipe, SlugifyPipe, SomePipe, SqrtPipe, StringUtils, PowPipe, PctPipe, MinPipe, MaxPipe, MapPipe, LastPipe, JoinPipe, FirstPipe, FillPipe, EveryPipe, CopyWithinPipe, CombinePipe, CharAtPipe, CamelCasePipe, ConcatPipe, InterpolatePipe, PascalCasePipe, RepeatPipe, TrimPipe, TrimLeftPipe, TrimRightPipe, TruncatePipe, AvgPipe, AbsPipe, CeilPipe, FloorPipe, RoundPipe, NumberUtils, TypeUtils, 
} from '@shared';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,

    // pipes
    SplitPipe,

    // directives
    ClickOutsideDirective,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,

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
