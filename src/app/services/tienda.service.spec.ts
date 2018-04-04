import { TestBed, inject } from '@angular/core/testing';

import { TiendaService } from './tienda.service';

describe('TiendaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TiendaService]
    });
  });

  it('should be created', inject([TiendaService], (service: TiendaService) => {
    expect(service).toBeTruthy();
  }));
});
