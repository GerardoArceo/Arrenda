import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ValidadorService } from './validador.service';

describe('ValidadorService', () => {
  let service: ValidadorService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ValidadorService]
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(ValidadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
