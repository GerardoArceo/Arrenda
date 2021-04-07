import { TiposBienModel } from './tipos-bien.model';
import { MonedasModel } from './monedas.model';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { VerDatosComponent } from './ver-datos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { CatalogosService } from '../../../servicios/catalogos/catalogos.service';

describe('VerDatosComponent', () => {

  let component: VerDatosComponent;
  let fixture: ComponentFixture<VerDatosComponent>;
  let catalogosService: CatalogosService;
  
  let model = {
    title: 'component test Monedas',
    type: 'monedas',
    body: {
      cvemoneda: '1',
      nommoneda: 'PESO MEXICANO',
      nomcortomoneda: 'MXN',
      obsmoneda: 'Peso Mexicano'      
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VerDatosComponent ],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {provide: MatSnackBar, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: model}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
