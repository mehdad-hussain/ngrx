// prettier-ignore
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input, EventEmitter, Output, } from '@angular/core';

// prettier-ignore
import { fromEvent, Observable, of,debounceTime, distinctUntilChanged, filter, map, switchMap, tap, Subject, Subscription, catchError, } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Input() inputId: string = 'search-bar';
  @Input() placeholderText: string = 'Search...';
  @Input() searchUrl: string = 'https://api.github.com/search/users?q=';
  @Input() debounceTime: number = 1000;
  @Input() queryLength: number = 2;
  @Input() searchTypeServer: boolean = false;

  // section: variables for client side search
  @Input() searchArrOfObj: boolean = false; //  or array
  @Input() arrayForSearch: any[] = [
    134234,
    243656,
    'name',
    'email',
    49078,
    52886,
  ];
  @Input() searchableTableCol: string[] = ['id', 'name', 'anotherProperty'];
  @Input() tableArrayOfObject: any[] = [...Array(250).keys()].map((i) => ({
    id: i + 1,
    name: 'Item ' + (i + 1),
    anotherProperty: `Just another value for testing display ${i + 1}`,
  }));

  // section: input for classes
  @Input() inputContainerClasses: string = '';
  @Input() inputWrapperClasses: string = '';
  @Input() inputBoxClasses: string = '';
  @Input() searchIcon: boolean = true;
  @Input() searchIconClasses: string = '';

  @Output() searchResult = new EventEmitter<any>();

  // section: font awesome icons
  faSearch = faSearch;

  inputValue = new Subject<string>();
  /**idea: server side search
   * When the input changes, the onInput gets triggered
   * This in return pushes the next value to the inputValue observable
   * The inputValue observable is piped through a debounceTime rxjs operator and a distinctUntilChanged operator. debounceTime helps us to only emit a new value once the user has stopped typing for a certain amount of time. I found 300ms to be a comfortable value for this. distinctUntilChanged helps to not emit anything if the previous value would be the same as the current value. So for example if the user changes x to y then back to x in under 300ms, there’s no new event.
   * Once the trigger emits a new value, we emit it through the searchResult event emitter
   */

  getResults(query: string) {
    return ajax.getJSON(this.searchUrl + query);
  }

  trigger = this.inputValue.pipe(
    filter((value) => value.length > this.queryLength),
    debounceTime(this.debounceTime),
    distinctUntilChanged(),
    tap((query) =>
      console.log(`About to make an API call with query: ${query}`)
    ),
    switchMap((query) =>
      this.searchTypeServer === false
        ? this.getResultsCS(query)
        : this.getResults(query)
    ),
    catchError((errorResponse) => {
      alert(`oh no, there was an error when calling the ${this.searchUrl} api`);
      console.error(errorResponse);
      return of(null);
    })
  );

  subscriptions: Subscription[] = [];

  constructor() {}

  ngOnInit() {
    const subscription = this.trigger.subscribe((currentValue) => {
      this.searchResult.emit(currentValue);
      // console.log(currentValue);
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onInput(event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.inputValue.next(value);
  }

  /**idea: client side search through an array of objects
   * grab the value of input with the help of ViewChild or onInput event
   * filter the data with the help of filter method
   * loop through each object and check if the value of input is present in any of the key of the object with the help of some method
   * convert the key to string and toLowerCase() to make it case insensitive
   * convert the value of input means query to lowercase
   * remove the spaces from the key and query
   * return the filtered data
   */

  // section: an example array of items to be paged
  // @ViewChild('searchBox') searchBox!: ElementRef;

  // section: search function { [x: string]: string }
  getResultsCS(query: string) {
    return this.searchArrOfObj === true
      ? of(
          this.tableArrayOfObject.filter((item: any) =>
            this.searchableTableCol.some((key) =>
              item[key]
                .toString()
                .replace(/ /g, '')
                .toLowerCase()
                .includes(query.toLocaleLowerCase().replace(/ /g, ''))
            )
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

  /**idea: with from event
 * Listen for data from an input
 * Trim the value (remove whitespace) and make sure it's a minimum length
 * Debounce (so as not to send off API requests for every keystroke, but instead wait for a break
   in keystrokes)
 * Don't send a request if the value stays the same (rapidly hit a character, then backspace, for
   instance)
 * Cancel ongoing AJAX requests if their results will be invalidated by the updated results
 */

  // section: fromEvent Live search

  // search(query: any) {
  //   let exampleItems = [...Array(250).keys()].map((i) => ({
  //     id: i + 1,
  //     name: 'Item ' + (i + 1),
  //     anotherProperty: `Just another value for testing display ${i + 1}`,
  //   }));

  //   let keys = ['id', 'name', 'anotherProperty'];
  //   console.log(query);
  //   return exampleItems.filter((item: any) =>
  //     keys.some((key: string) =>
  //       item[key].toString().toLowerCase().includes(query.toLowerCase())
  //     )
  //   );
  // }

  // setQuery() {
  //   const element = this.searchBox.nativeElement;
  //   const searchBoxx = document.getElementById('searchBox') as HTMLInputElement;

  //   const search = (data: any) => {
  //     return of(
  //       [1, 1234, 3234, 4, 5].filter((item: any) =>
  //         item.toString().includes(data)
  //       )
  //     );
  //   };

  //   const onSearchSuccess = (matchingValues: any) => {
  //     console.log(matchingValues);
  //   };

  //   const typeAhead$ = fromEvent(searchBoxx, 'input').pipe(
  //     debounceTime(1000),
  //     distinctUntilChanged(),
  //     map((e) => (e.target as HTMLInputElement).value),
  //     filter((text) => text.length > 2),
  //     tap((query) =>
  //       console.log(`About to make an API call with query: ${query}`)
  //     ),
  //     switchMap(search)
  //   );

  //   typeAhead$.subscribe((data) => {
  //     console.log(data);
  //   });
}
