import { TestBed } from '@angular/core/testing';

import { AddedUnitService } from './added-unit.service';

describe('AddedUnitService', () => {
  let service: AddedUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddedUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
