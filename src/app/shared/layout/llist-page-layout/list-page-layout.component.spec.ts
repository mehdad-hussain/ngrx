import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPageLayoutComponent } from './list-page-layout.component';

describe('ListPageLayoutComponent', () => {
  let component: ListPageLayoutComponent;
  let fixture: ComponentFixture<ListPageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPageLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
