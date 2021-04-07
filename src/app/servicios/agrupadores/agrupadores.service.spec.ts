import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { AgrupadoresService } from './agrupadores.service';

describe('Service: Agrupadores', () => {
  let service :AgrupadoresService;
  let httpCliente: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule
      ],
      providers: [AgrupadoresService]
    });
    httpCliente = TestBed.inject(HttpClient);
    service = TestBed.inject(AgrupadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
