import { TestBed, inject } from '@angular/core/testing';

import { NivelesService } from './niveles.service';

describe('NivelesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NivelesService]
    });
  });

  it('should be created', inject([NivelesService], (service: NivelesService) => {
    expect(service).toBeTruthy();
  }));
});
