import { ProveedoresService } from './proveedores.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed, inject, waitForAsync } from '@angular/core/testing';

describe('Service: proveedores', () => {
  let service: ProveedoresService;
  let httpclient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule
      ],
      providers: [ProveedoresService]
    });
    httpclient = TestBed.inject(HttpClient);
    service = TestBed.inject(ProveedoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
