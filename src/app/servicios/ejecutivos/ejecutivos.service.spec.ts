import { EjecutivosService } from './ejecutivos.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed, inject, waitForAsync } from '@angular/core/testing';

describe('Service: Status', () => {
  let service: EjecutivosService;
  let httpclient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule
      ],
      providers: [EjecutivosService]
    });
    httpclient = TestBed.inject(HttpClient);
    service = TestBed.inject(EjecutivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
