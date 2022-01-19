import { TestBed } from '@angular/core/testing';

import { ProdInterceptorService } from './prod-interceptor.service';

describe('ProdInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdInterceptorService = TestBed.get(ProdInterceptorService);
    expect(service).toBeTruthy();
  });
});
