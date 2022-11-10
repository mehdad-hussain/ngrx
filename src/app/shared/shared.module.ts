import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// import: local imports
// prettier-ignore
import { HeaderComponent, FooterComponent,CounterComponent,CounterButtonsComponent,CounterOutputComponent,CustomCounterInputComponent } from './layout';
import { ClickOutsideDirective } from './directives';
// prettier-ignore
import { SplitPipe, SumPipe, TypeOfPipe, ReversePipe, LengthPipe, SentenceCasePipe, SlugifyPipe, SomePipe, SqrtPipe, PowPipe, PctPipe, MinPipe, MaxPipe, MapPipe, LastPipe, JoinPipe, FirstPipe, FillPipe, EveryPipe, CopyWithinPipe, CombinePipe, CharAtPipe, CamelCasePipe, ConcatPipe, InterpolatePipe, PascalCasePipe, RepeatPipe, TrimPipe, TrimLeftPipe, TrimRightPipe, TruncatePipe, AvgPipe, AbsPipe, CeilPipe, FloorPipe, RoundPipe, JoinObjectValuesPipe } from './pipes';
// prettier-ignore
import { CheckboxComponent, InputComponent, ModalContainerComponent, PaginationBarComponent, RadioBtnComponent, SearchBarComponent, SelectComponent, SliderComponent, TabComponent, TableContainerComponent, TabsContainerComponent, ToastComponent, ToggleThemeBtnComponent} from './components';

@NgModule({
  declarations: [
    // components
    HeaderComponent,
    FooterComponent,
    CounterComponent,
    CounterButtonsComponent,
    CounterOutputComponent,
    CustomCounterInputComponent,
    ModalContainerComponent,
    TabsContainerComponent,
    TabComponent,
    InputComponent,
    ToastComponent,
    TableContainerComponent,
    SelectComponent,
    RadioBtnComponent,
    PaginationBarComponent,
    SearchBarComponent,
    SliderComponent,
    CheckboxComponent,

    // pipes
    SplitPipe,
    JoinObjectValuesPipe,
    // directives
    ClickOutsideDirective,
    ToggleThemeBtnComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,

    // export: components
    HeaderComponent,
    FooterComponent,
    CounterComponent,
    TableContainerComponent,
    ToggleThemeBtnComponent,
    PaginationBarComponent,

    // export: directives
    ClickOutsideDirective,

    // export: pipes
    SplitPipe,
  ],
})
export class SharedModule {}
