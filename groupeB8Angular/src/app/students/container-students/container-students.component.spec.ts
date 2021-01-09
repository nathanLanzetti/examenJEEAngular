import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerStudentsComponent } from './container-students.component';

describe('ContainerStudentsComponent', () => {
  let component: ContainerStudentsComponent;
  let fixture: ComponentFixture<ContainerStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
