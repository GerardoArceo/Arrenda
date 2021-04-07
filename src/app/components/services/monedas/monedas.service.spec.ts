import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MonedasService } from './monedas.service';

describe('Service: Monedas', () => {
  let service: MonedasService;
  let httpCliente: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MonedasService]
    });
    httpCliente = TestBed.inject(HttpClient);
    service = TestBed.inject(MonedasService);
  });

  it('should ...', inject([MonedasService], (service: MonedasService) => {
    expect(service).toBeTruthy();
  }));
});
