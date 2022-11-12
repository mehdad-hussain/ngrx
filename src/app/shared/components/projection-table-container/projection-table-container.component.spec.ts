import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionTableContainerComponent } from './projection-table-container.component';

describe('ProjectionTableContainerComponent', () => {
  let component: ProjectionTableContainerComponent;
  let fixture: ComponentFixture<ProjectionTableContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionTableContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectionTableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
