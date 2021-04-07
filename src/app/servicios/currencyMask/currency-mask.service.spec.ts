import { TestBed } from '@angular/core/testing';

import { CurrencyMaskService } from './currency-mask.service';

describe('CurrencyMaskService', () => {
  let service: CurrencyMaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyMaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
