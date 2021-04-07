/* tslint:disable:no-unused-variable */
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { CatalogosService } from './catalogos.service';

describe('Service: Catalogos', () => {
  let service: CatalogosService;
  let httpCliente: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule
      ],
      providers: [CatalogosService]
    });
    httpCliente = TestBed.inject(HttpClient);
    service = TestBed.inject(CatalogosService);
  });

  it('should ...', inject([CatalogosService], (service: CatalogosService) => {
    expect(service).toBeTruthy();
  }));
});
