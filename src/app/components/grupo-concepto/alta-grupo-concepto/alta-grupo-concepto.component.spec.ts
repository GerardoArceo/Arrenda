import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../../material-module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './../../login/login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AltaGrupoConceptoComponent } from './alta-grupo-concepto.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('AltaGrupoConceptoComponent', () => {
  let component: AltaGrupoConceptoComponent;
  let fixture: ComponentFixture<AltaGrupoConceptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaGrupoConceptoComponent ],
      imports:[
        RouterTestingModule.withRoutes([
          {path: 'arrendadora/login',component: LoginComponent}
        ]),
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        MaterialModule,
        ReactiveFormsModule,BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaGrupoConceptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
