import { TestBed } from '@angular/core/testing';

import { RemovedUnitService } from './removed-unit.service';

describe('RemovedUnitService', () => {
  let service: RemovedUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemovedUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
