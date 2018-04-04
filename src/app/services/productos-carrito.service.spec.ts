import { TestBed, inject } from '@angular/core/testing';

import { ProductosCarritoService } from './productos-carrito.service';

describe('ProductosCarritoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductosCarritoService]
    });
  });

  it('should be created', inject([ProductosCarritoService], (service: ProductosCarritoService) => {
    expect(service).toBeTruthy();
  }));
});
