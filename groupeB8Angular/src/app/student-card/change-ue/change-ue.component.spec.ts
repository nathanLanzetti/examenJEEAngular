import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUEComponent } from './change-ue.component';

describe('ChangeUEComponent', () => {
  let component: ChangeUEComponent;
  let fixture: ComponentFixture<ChangeUEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeUEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeUEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
