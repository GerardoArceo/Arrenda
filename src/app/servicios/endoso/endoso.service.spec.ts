import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { EndosoService } from './endoso.service';

describe('Service: Endoso', () => {
  let service: EndosoService;
  let httpCliente: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule
      ],
      providers: [EndosoService]
    });
    httpCliente = TestBed.inject(HttpClient);
    service = TestBed.inject(EndosoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
