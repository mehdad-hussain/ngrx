import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

// prettier-ignore
import { faChevronLeft, faChevronRight, } from '@fortawesome/free-solid-svg-icons';

// import: local files
import { TableService, PaginationService } from '@core';

@Component({
  selector: 'app-pagination-bar',
  templateUrl: './pagination-bar.component.html',
  styleUrls: ['./pagination-bar.component.scss'],
})
export class PaginationBarComponent implements OnInit {
  @Input() paginationId: string = '';
  @Input() pageSize: number = 10;
  @Input() maxPages: number = 5;
  @Input() showPageSizeDropdown: boolean = false;
  @ViewChild('pageSizeDropdown')
  pageSizeDropdown!: ElementRef;

  pager: any;
  initialPage = 1;
  pageOfItems: any;
  items: any;
  halfwayPoint: number = 0;
  rightDot: number = 0;
  paginationObject: any;
  paginationData: any[] = [];
  maxPagesToDisplay = this.maxPages;
  pageSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 100];

  // section: font awesome icons
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  constructor(
    private tableService: TableService,
    private pagination: PaginationService
  ) {}

  ngOnInit(): void {
    // console.log(this.data);
    // this.setPage(this.initialPage);

    this.paginationObject = this.pagination.getPaginationData(
      this.paginationId
    );
    this.paginationData = this.paginationObject.data;
    this.items = this.paginationData;
    this.getPager(this.items.length, 1, this.pageSize, this.maxPagesToDisplay);
  }

  // // an example array of items to be paged
  // exampleItems = [...Array(250).keys()].map((i) => ({
  //   id: i + 1,
  //   name: 'Item ' + (i + 1),
  //   anotherProperty: `Just another value for testing display ${i + 1}`,
  // }));

  getPager(
    totalItems: number,
    currentPage: number,
    pageSize: number,
    maxPagesToDisplay: number
  ) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // default max pages to display is 10
    maxPagesToDisplay = maxPagesToDisplay || 10;

    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // idea: if total pages is less than max pages to display, set max pages to display to total pages
    if (totalPages < maxPagesToDisplay) {
      maxPagesToDisplay = totalPages;
    }

    let startPage: number, endPage;

    if (totalPages <= maxPagesToDisplay) {
      // idea: less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // idea: more than 10 total pages so calculate start and end pages

      this.halfwayPoint = Math.ceil(maxPagesToDisplay / 2);
      let pastHalfwayPoint = Math.floor(maxPagesToDisplay / 2) + 1;
      let beforeHalfwayPoint = this.halfwayPoint - 1;
      // console.log(this.halfwayPoint, pastHalfwayPoint, beforeHalfwayPoint);
      if (currentPage <= pastHalfwayPoint) {
        startPage = 1;
        endPage = maxPagesToDisplay;
      } else if (currentPage + beforeHalfwayPoint >= totalPages) {
        startPage = totalPages - (maxPagesToDisplay - 1);
        endPage = totalPages;
      } else {
        startPage = currentPage - this.halfwayPoint;
        endPage = currentPage + beforeHalfwayPoint;
      }
    }

    // idea: calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // idea: create an array of pages to ng-repeat in the pager control

    let pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );

    if (maxPagesToDisplay % 2 === 0) {
      this.rightDot = 1;
    }

    // prettier-ignore
    this.pager = { totalItems, currentPage, pageSize, maxPagesToDisplay, totalPages, startPage, endPage, startIndex, endIndex, pages, };

    // return object with all pager properties required by the view
    return this.pager;
  }

  setPage(page: number) {
    let items = this.items;
    let pager = this.pager;

    let totalPages = Math.ceil(items.length / this.pageSize);

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // idea: if total pages is less than max pages to display, set max pages to display to total pages

    if (totalPages < this.maxPages) {
      this.maxPagesToDisplay = totalPages;
    } else {
      this.maxPagesToDisplay = this.maxPages;
    }

    // idea: get new pager object for specified page
    pager = this.getPager(
      items.length,
      page,
      this.pageSize,
      this.maxPagesToDisplay
    );

    // idea: get new page of items from items array
    let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // update state
    // this.setPager(pager);

    this.pager = pager;

    // call change page function in parent component
    // this.onChangePage(pageOfItems);
    // return { pager, pageOfItems };
    this.tableService.changeTableRows(this.paginationId, pageOfItems);
  }

  // // section: function for parent component
  // onChangePage = (pageOfItems: any) => {
  //   // update state with new page of items
  //   this.pageOfItems = pageOfItems;
  // };

  setPageSize(event: Event) {
    // console.log(this.pager.currentPage);

    let pageSize = parseInt((event.target as HTMLInputElement).value);
    this.pageSize = pageSize;
    let totalPages = Math.ceil(this.items.length / this.pageSize);
    if (this.pager.currentPage > totalPages) {
      this.setPage(totalPages);
    } else {
      this.setPage(this.pager.currentPage);
    }
  }

  ngAfterViewInit() {
    if (this.showPageSizeDropdown) {
      this.pageSizeDropdown.nativeElement.value = this.pageSize.toString();
    }
  }

  loadNextDataStream() {}
}
