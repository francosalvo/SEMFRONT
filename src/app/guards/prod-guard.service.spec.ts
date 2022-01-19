import { TestBed } from '@angular/core/testing';

import { ProdGuardService } from './prod-guard.service';

describe('ProdGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdGuardService = TestBed.get(ProdGuardService);
    expect(service).toBeTruthy();
  });
});
