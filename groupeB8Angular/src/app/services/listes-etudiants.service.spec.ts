import { TestBed } from '@angular/core/testing';

import { ListesEtudiantsService } from './listes-etudiants.service';

describe('ListesEtudiantsService', () => {
  let service: ListesEtudiantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListesEtudiantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
