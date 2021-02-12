import { TestBed } from '@angular/core/testing';

import { PrestadorServiciosService } from './prestador-servicios.service';

describe('PrestadorServiciosService', () => {
  let service: PrestadorServiciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestadorServiciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
