import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FacturaService } from './factura.service';

describe('FacturaService', () => {
  let service: FacturaService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FacturaService]
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(FacturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
