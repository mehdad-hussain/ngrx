import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  @Input() maxPagesToDisplay: number = 5;

  pager: any;
  initialPage = 1;
  pageOfItems: any;
  items: any;
  halfwayPoint: number = 0;
  rightDot: number = 0;
  paginationObject: any;
  paginationData: any[] = [];

  // section: font awesome icons
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  constructor(
    private table: TableService,
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

  setPage(page: number, $event?: Event) {
    $event?.preventDefault();
    let items = this.items;
    let pager = this.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // idea: if total pages is less than max pages to display, set max pages to display to total pages
    if (pager.totalPages < this.maxPagesToDisplay) {
      this.maxPagesToDisplay = pager.totalPages;
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
    this.table.changeTableRows(this.paginationId, pageOfItems);
  }

  // setPager(pager: any) {
  //   this.pager = pager;
  // }

  // // section: function for parent component
  // onChangePage = (pageOfItems: any) => {
  //   // update state with new page of items
  //   this.pageOfItems = pageOfItems;
  // };

  setArrOfCurrentBtn() {
    let arr = [];
    for (let i = this.pager.startPage; i <= this.pager.endPage; i++) {
      arr.push(i);
    }
    return arr;
  }
}
