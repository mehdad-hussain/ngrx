// prettier-ignore
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { faAngleDown, faStarOfLife } from '@fortawesome/free-solid-svg-icons';
// prettier-ignore
import { catchError, debounceTime, distinctUntilChanged, filter, fromEvent, Observable, of, Subject, Subscription, switchMap, tap, } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)',
  },
})
export class SelectComponent implements OnInit {
  // todo: add client side search functionality
  // todo: add input for search input file availability

  // section: input properties
  @Input() options: any;
  @Input() label!: string;
  @Input() bindValue: string = '';
  @Input() inputType: string = 'text';
  @Input() control: FormControl = new FormControl();
  @Input() hideSelected: boolean = false;
  @Input() placeholder: string = '';

  // section: input properties for search input to get options from server
  @Input() searchUrl: string = 'https://api.github.com/search/users?q=';
  @Input() debounceTime: number = 1000;
  @Input() queryLength: number = 2;
  @Input() searchTypeServer: boolean = false;

  // section: input css classes
  @Input() collectionClasses!: string;
  @Input() buttonClasses!: string;
  @Input() labelClasses!: string;
  @Input() labelContainerClasses!: string;
  @Input() valueClasses!: string;
  @Input() inputClasses!: string;
  @Input() listContainerClasses!: string;
  @Input() listClasses!: string;

  // section: variables for client side search
  @Input() searchArrObj: boolean = true; //  or array
  // prettier-ignore
  @Input() arrayForSearch: any[] = [ 134234, 243656, 'name', 'email', 49078, 52886, ];
  @Input() searchableTableCol: string[] = ['id', 'name', 'anotherProperty'];

  @Input() arrayOfObject: any[] = [...Array(250).keys()].map((i) => ({
    id: i + 1,
    name: 'Item ' + (i + 1),
    anotherProperty: `Just another value for testing display ${i + 1}`,
  }));
  @Input() showRequiredMsg: boolean = false;

  // section: font awesome icons
  faAngleDown = faAngleDown;
  faStar = faStarOfLife;

  originalOptions: any[] = [];
  currentValue: any;
  query: string = '';

  // section: various state of select component - dropdown, search input
  dropdownOpen: boolean = false;
  loading: boolean = false;
  noDataFound: boolean = false;
  showSearchPlaceholder: boolean = false;
  isRequired: boolean = false;
  searchResult: any;

  private currentIndex = -1;

  inputValue = new Subject<string>();

  // section: viewChild of search input
  @ViewChild('dropdownSearch') dropdownSearch!: ElementRef;
  // @ViewChild('dropdownListGroup') dropdownListGroup!: ElementRef;

  // section: output properties
  @Output() currentSelectedOption = new EventEmitter();

  // section: constructor
  constructor(private element: ElementRef) {}

  // section: ngOnInit
  ngOnInit(): void {
    if (this.searchTypeServer) {
      this.originalOptions = [];
      this.currentValue = {};
      const subscription = this.trigger.subscribe((item: any) => {
        this.loading = false;
        // console.log(item);
        this.originalOptions = item.items;
        this.currentValue = item.items;
        this.searchResult = item.items;
        !this.searchResult.length
          ? (this.noDataFound = true)
          : (this.noDataFound = false);
      });
      this.subscriptions.push(subscription);
    } else {
      this.originalOptions = [...this.options];
      this.currentValue = this.options[0];
      const subscription = this.trigger.subscribe((item: any) => {
        this.loading = false;
        // console.log(item);
        this.originalOptions = item;
        this.currentValue = item;
        this.searchResult = item;
        !this.searchResult.length
          ? (this.noDataFound = true)
          : (this.noDataFound = false);
      });
      this.subscriptions.push(subscription);
    }

    if (this.showRequiredMsg) {
      this.isRequired = this.control.hasValidator(Validators.required);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  // section: server side search functionality

  trigger = this.inputValue.pipe(
    filter((value) => value.length > this.queryLength),
    debounceTime(this.debounceTime),
    distinctUntilChanged(),
    tap((query) => {
      console.log(`About to make an API call with query: ${query}`);
      this.loading = true;
      this.showSearchPlaceholder = false;
    }),
    switchMap((query) =>
      this.searchTypeServer === false
        ? this.getResultClient(query)
        : this.getResultServer(query)
    ),
    catchError((errorResponse) => {
      this.loading = false;

      alert(`oh no, there was an error when calling the ${this.searchUrl} api`);
      console.error(errorResponse);
      return of(null);
    })
  );

  getResultServer(query: string) {
    return ajax.getJSON(this.searchUrl + query);
  }

  subscriptions: Subscription[] = [];

  onInput(event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.query = value;
    this.inputValue.next(value);
  }

  // section: keyboard actions functionality

  handleKeyboardEvents($event: KeyboardEvent) {
    if (this.dropdownOpen) {
      if (
        $event.key === 'ArrowDown' ||
        $event.key === 'ArrowUp' ||
        $event.code === 'Enter' ||
        $event.code === 'NumpadEnter' ||
        $event.code === 'Escape'
      ) {
        $event.preventDefault();
      }
      if ($event.code === 'ArrowUp') {
        if (this.currentIndex < 0) {
          this.currentIndex = 0;
        } else if (this.currentIndex > 0) {
          this.currentIndex--;
        }
        this.element.nativeElement
          .querySelectorAll('li')
          .item(this.currentIndex)
          .focus();
      } else if ($event.code === 'ArrowDown') {
        if (this.currentIndex < 0) {
          this.currentIndex = 0;
        } else if (this.currentIndex < this.originalOptions.length - 1) {
          this.currentIndex++;
        }
        this.element.nativeElement
          .querySelectorAll('li')
          .item(this.currentIndex)
          .focus();
      } else if (
        ($event.code === 'Enter' || $event.code === 'NumpadEnter') &&
        this.currentIndex >= 0
      ) {
        this.selectByIndex(this.currentIndex);
      } else if ($event.code === 'Escape') {
        this.closeDropdown();
      } else {
        return;
      }
    } else {
      return;
    }
  }

  selectByIndex(i: number) {
    let value = this.originalOptions[i];
    this.select(value);
    console.log(value);
  }

  // section: function to select an option

  select(value: any) {
    this.currentValue = value;

    if (this.hideSelected) {
      if (this.searchTypeServer) {
        this.originalOptions = this.searchResult.filter(
          (item: any) => item !== value
        );
        this.control.setValue(value[this.bindValue]);
      } else {
        this.originalOptions = this.options.filter(
          (item: any) => item !== value
        );
        this.control.setValue(value[this.bindValue]);
      }
    }
    this.closeDropdown();
    this.currentSelectedOption.emit(this.currentValue);
  }

  // section: function to open and close dropdown

  closeDropdown() {
    // this.dropdownElement.setAttribute('aria-expanded', 'false');
    this.currentIndex = -1;
    this.dropdownOpen = false;
    if (this.noDataFound) {
      this.control.setValue('');
      this.showSearchPlaceholder = true;
    }
  }

  openDropdown() {
    // this.dropdownOpen = !this.dropdownOpen;
    this.dropdownOpen = true;

    this.searchResult
      ? (this.showSearchPlaceholder = false)
      : (this.showSearchPlaceholder = true);
    // this.dropdownElement.setAttribute('aria-expanded', 'true');
    // if (!this.searchTypeServer) {
    // }
    this.dropdownSearch.nativeElement.focus();

    // section:  outside click functionality

    const observeClickOutside = fromEvent(document, 'click').subscribe(
      (event: any) => {
        if (!this.element.nativeElement.contains(event.target)) {
          this.closeDropdown();
          observeClickOutside.unsubscribe();
        }
      }
    );
  }

  // section: client side search functionality

  getResultClient(query: string) {
    return this.searchArrObj === true
      ? of(
          this.options.filter((item: any) =>
            item[this.bindValue]
              .toString()
              .replace(/ /g, '')
              .toLowerCase()
              .includes(query.toLocaleLowerCase().replace(/ /g, ''))
          )
        )
      : of(
          this.arrayForSearch.filter((item) =>
            item
              .toString()
              .replace(/ /g, '')
              .toLocaleLowerCase()
              .includes(query.toLowerCase().replace(/ /g, ''))
          )
        );
  }

  /**idea:
   * When the selected value changes, which is done via the select() function, the new value is emitted with an EventEmitter.
   * There are also basic functions to handle closing the dropdown, selecting by index (which is done with keyboard input), and toggling the dropdown open and closed.
   * we set the aria-expanded attribute dynamically when the dropdown changes states.
   * Because our html includes tabindex="0" on each option, there is some basic tab-navigation available by default.
   * However, we also want to allow the user to navigate the list with arrow keys, press “Enter” to choose an option, and press “Esc” to close the list.
   * To allow for this, we include a host option in our Component decorator, which listens for keyboard events and then calls our handleKeyboardEvents() function.
   * Inside this function, if the dropdown isn’t open, then we don’t want to handle keyboard events, so we’ll just return.
   * Without this check, the dropdown would hijack all keyboard events.
   * If it is open, then we preventDefault() so that an event like an arrow key doesn’t scroll the page.
   *The rest of the code is fairly simple — the arrow key events move the highlighted index up and down, pressing “Enter” selects the currently selected option, and “Esc” closes the dropdown.
   */
}

/**
 * we create a getter named label that determines if we should display the selected option label
 * or a placeholder based on the model value.
 */
// get label() {
//   return this.model ? this.model[this.labelKey] : 'Select...';
// }

// get dropdownElement(): Element {
//   return this.element.nativeElement.querySelector('.dropdown-list-group');
// }

// get searchBoxElement(): Element {
//   return this.element.nativeElement.getElementById('dropdown-search');
// }
