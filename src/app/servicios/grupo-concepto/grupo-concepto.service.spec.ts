import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { GrupoConceptoService } from './grupo-concepto.service';

describe('Service: GrupoConcepto', () => {
  let service: GrupoConceptoService;
  let httpclient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule
      ],
      providers: [GrupoConceptoService]
    });
    httpclient = TestBed.inject(HttpClient);
    service = TestBed.inject(GrupoConceptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
