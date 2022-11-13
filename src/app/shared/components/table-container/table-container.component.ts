// prettier-ignore
import { Component, Input, OnInit } from '@angular/core';
// prettier-ignore
import { faArrowDownWideShort, faArrowUpWideShort, faSort } from '@fortawesome/free-solid-svg-icons';

// import: local files
import { TableService } from '@core';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.scss'],
})
export class TableContainerComponent implements OnInit {
  // section: Table Classes inputs from parents
  @Input() tableName: string = '';
  @Input() tableContainerClass: string = '';
  @Input() tableBodyClass: string = '';
  @Input() tableHeaderClass: string = '';

  @Input() customColumns: {
    name: string;
    index: number;
    icon: any;
    type: string;
  }[] = [];
  indexList: number[] = [];

  // section: Optional Inputs
  // @Input() resizable!: Boolean;
  // @Input() longPress!: Boolean;
  // @Input() dragging!: Boolean;
  // @Input() sortActive!: Boolean;
  // @Input() sortAsc!: Boolean;
  // @Input() sortDesc!: Boolean;
  @Input() ListOfNotSortableColumns!: string[];
  @Input() rowEven!: Boolean;
  @Input() rowOdd!: Boolean;
  @Input() bodyRow!: Boolean;
  @Input() headerRow!: Boolean;

  // section: TABLE DATA COLUMN AND ROW WILL GET FROM TABLE SERVICE
  rows: any[] = [];
  actions: { name: string; icon: any }[] = [];
  tableData: any;

  // section: sorting related variables
  columnName = '';
  sortedRows: any[] = [];
  sortedColumns: any[] = [];

  selectedRows: any[] = [];
  dataForPrint: any[] = [];
  // section: font awesome icons
  faArrowUpWideShort = faArrowUpWideShort;
  faArrowDownWideShort = faArrowDownWideShort;
  faSort = faSort;

  constructor(private table: TableService) {}

  ngOnInit(): void {
    this.tableData = this.table.getTableData(this.tableName);
    this.rows = this.tableData.rows;
    this.sortedRows = this.rows;
    this.actions = this.tableData.actions;

    console.log('table data - ', this.tableData);
    console.log('table rows - ', this.rows);
    console.log('sorted rows - ', this.sortedRows);
    /**section: creating column objects for making easier to show sorted data and icons conditionally
     * 1. create an array of objects with column name, is it sortable or not, and in which order it is sorted
     * 2. if the column is not sortable, then set the order to none
     */
    this.sortedColumns = this.tableData.columns.map((column: string) => {
      if (this.ListOfNotSortableColumns.includes(column)) {
        return { name: column, sortable: false, sort: 'none' };
      } else {
        return {
          name: column,
          sortable: true,
          sort: 'none',
        };
      }
    });

    // section: changing table data when page is changed
    this.table.changeTableData$.subscribe((res) => {
      // console.log(res);
      if (res) {
        const { fn } = this.sortTypes[this.currentSort];

        this.sortedRows = [...res].sort(fn);
        // this.sortedRows = res;
      }
    });

    this.customColumns.map((column) => {
      this.indexList.push(column.index);
    });
  }

  // section: function for joining the css classes in to one string
  classNames = (...params: string[]) => {
    return params.filter(Boolean).join(' ');
  };

  // section: function for sorting rows after using keyvalue pipe in html for iterating over objects(rows)
  pipeSortFunction = (a: any, b: any) => {
    return a - b;
  };

  /**section: sorting related objects, variables, and functions
   * 1. object sortTypes: contains the function for sorting the data in ascending, descending order and get back default order
   * 2. function onSortChange: take the column name , set next sorting order, add the sorting order to the sortedColumns array, and sort the rows according to the sorting order
   */
  sortTypes: any = {
    up: {
      fn: (a?: any, b?: any) => {
        let Ca, Cb;
        if (typeof a[this.columnName] === 'string') {
          Ca = a[this.columnName].toLowerCase();
          Cb = b[this.columnName].toLowerCase();
        } else {
          Ca = a[this.columnName];
          Cb = b[this.columnName];
        }
        return Ca < Cb ? -1 : 0;
      },
    },
    down: {
      fn: (a?: any, b?: any) => {
        let Ca, Cb;
        if (typeof a[this.columnName] === 'string') {
          Ca = a[this.columnName].toLowerCase();
          Cb = b[this.columnName].toLowerCase();
        } else {
          Ca = a[this.columnName];
          Cb = b[this.columnName];
        }
        return Ca > Cb ? -1 : 0;
      },
    },
    default: {
      fn: (a?: any, b?: any) => {
        return a;
      },
    },
  };

  currentSort = 'default';

  onSortChange = (column: string) => {
    let nextSort = '';

    if (this.columnName !== column) {
      this.currentSort = 'default';
      this.sortedColumns = this.sortedColumns.map((col) => {
        if (col.name !== column) {
          col.sort = 'none';
        }
        return col;
      });
    }
    // console.log(this.currentSort);

    this.columnName = column;

    if (this.currentSort === 'down') {
      nextSort = 'up';
      this.sortedColumns = this.sortedColumns.map((col) => {
        return col.name === column ? { ...col, sort: 'sort-up' } : col;
      });
    } else if (this.currentSort === 'up') {
      nextSort = 'default';
      this.sortedColumns = this.sortedColumns.map((col) => {
        return col.name === column ? { ...col, sort: 'none' } : col;
      });
    } else if (this.currentSort === 'default') {
      nextSort = 'down';
      this.sortedColumns = this.sortedColumns.map((col) => {
        return col.name === column ? { ...col, sort: 'sort-down' } : col;
      });
    }

    this.currentSort = nextSort;

    const { fn } = this.sortTypes[this.currentSort];

    this.sortedRows = [...this.sortedRows].sort(fn);
  };

  // section: function  for actions buttons
  onclick = (row: any, action: string) => {
    console.log('clicked', action, row);
  };

  // section: function for custom columns

  customColumn = (row: any, index: number) => {
    // const { customColumn, index: customColumnIndex } = this.customColumns.find(
    //   (column) => column.index === index
    // );
    // return customColumn(row);
  };

  // section: FUNCTION FOR SELECTING ROWS WITH CHECKBOX
  selectRow = (event: any, value: any) => {
    // step 1: checking whether checkbox is checked or not
    let selected = event.target.checked;
    let columns = this.tableData.columns;

    if (selected) {
      this.selectedRows = [...this.selectedRows, value];
    } else {
      this.selectedRows = this.selectedRows.filter((row) => row !== value);
    }

    this.dataForPrint = [];
    if (this.selectedRows.length !== 0) {
      for (let r = 0; r < this.selectedRows.length; r++) {
        let obj: any = {};
        for (let c = 0; c < columns.length; c++) {
          obj[columns[c]] = this.selectedRows[r][c];
        }
        this.dataForPrint.push(obj);
      }
    }
    console.log(this.dataForPrint);
  };

  selectAllRows = (event: any, tableData: any) => {
    // step 1: checking whether checkbox is checked or not
    let selected = event.target.checked;
    console.log(selected);

    // step 2: if allSelected is true, then select all the rows
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox: any) => {
      selected ? (checkbox.checked = true) : (checkbox.checked = false);
    });

    let columns = tableData.columns;
    this.selectedRows = tableData.rows;
    this.dataForPrint = [];

    // step 3: if selected is true, make table array with all the rows and column names

    if (selected) {
      for (let r = 0; r < this.selectedRows.length; r++) {
        let obj: any = {};
        for (let c = 0; c < columns.length; c++) {
          obj[columns[c]] = this.selectedRows[r][c];
        }
        this.dataForPrint.push(obj);
      }
    } else {
      this.dataForPrint = [];
      this.selectedRows = [];
    }
    console.log(this.dataForPrint);
  };
}
