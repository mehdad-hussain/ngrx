import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface IPagination {
  id: string;
  data: any[];
}
@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private paginationData: IPagination[] = [];

  private changePaginationData = new Subject<any[]>();
  changePaginationData$ = this.changePaginationData.asObservable();

  constructor() {}

  setPaginationData(id: string, data: any[]) {
    this.paginationData.push({
      id,
      data,
    });
  }

  changePaginationDataArray(id: string, row: any[]) {
    this.paginationData.map((pagination) => {
      pagination.id === id ? this.changePaginationData.next(row) : pagination;
    });
  }

  getPaginationData = (id: string) => {
    const pagination = this.paginationData.find(
      (pagination) => pagination.id === id
    );
    return pagination;
  };

  unregister(id: string) {
    this.paginationData = this.paginationData.filter(
      (pagination) => pagination.id !== id
    );
  }
}
