import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { LeyendasService } from './leyendas.service';

describe('Service: Leyendas', () => {
  let service: LeyendasService;
  let httpCliente: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule
      ],
      providers: [LeyendasService]
    });
    httpCliente = TestBed.inject(HttpClient);
    service = TestBed.inject(LeyendasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
