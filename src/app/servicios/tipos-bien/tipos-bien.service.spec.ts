import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { TiposBienService } from './tipos-bien.service';

describe('Service: TiposBien', () => {
let service:TiposBienService;
let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule
      ],
      providers: [TiposBienService]
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(TiposBienService);
  });

  it('should ...', inject([TiposBienService], (service: TiposBienService) => {
    expect(service).toBeTruthy();
  }));
});
