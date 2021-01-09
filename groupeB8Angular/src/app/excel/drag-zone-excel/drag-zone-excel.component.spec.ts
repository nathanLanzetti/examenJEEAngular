import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragZoneExcelComponent } from './drag-zone-excel.component';

describe('DragZoneExcelComponent', () => {
  let component: DragZoneExcelComponent;
  let fixture: ComponentFixture<DragZoneExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragZoneExcelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragZoneExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
