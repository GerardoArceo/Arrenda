import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { MonedasService } from './monedas.service';

describe('Service: Monedas', () => {
  let service: MonedasService;
  let httpCliente: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule
      ],
      providers: [MonedasService]
    });
    httpCliente = TestBed.inject(HttpClient);
    service = TestBed.inject(MonedasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
