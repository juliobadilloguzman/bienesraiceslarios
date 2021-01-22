import { TestBed } from '@angular/core/testing';

import { TerrenosService } from './terrenos.service';

describe('TerrenosService', () => {
  let service: TerrenosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerrenosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
