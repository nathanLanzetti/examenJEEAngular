import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedUnitComponent } from './added-unit.component';

describe('AddedUnitComponent', () => {
  let component: AddedUnitComponent;
  let fixture: ComponentFixture<AddedUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
