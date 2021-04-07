import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { VendorProgramService } from './vendor-program.service';

describe('Service: VendorProgram', () => {
  let service: VendorProgramService;
  let httpCliente: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule
      ],
      providers: [VendorProgramService]
    });
    httpCliente = TestBed.inject(HttpClient);
    service = TestBed.inject(VendorProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
