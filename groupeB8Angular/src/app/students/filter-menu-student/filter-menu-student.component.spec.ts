import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMenuStudentComponent } from './filter-menu-student.component';

describe('FilterMenuStudentComponent', () => {
  let component: FilterMenuStudentComponent;
  let fixture: ComponentFixture<FilterMenuStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterMenuStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterMenuStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
