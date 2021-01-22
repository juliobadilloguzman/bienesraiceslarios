import { TestBed } from '@angular/core/testing';

import { FraccionamientosService } from './fraccionamientos.service';

describe('FraccionamientosService', () => {
  let service: FraccionamientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FraccionamientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
