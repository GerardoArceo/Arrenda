/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AltaStatusComponent } from './alta-status.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../../login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AltaEstatusComponent', () => {
  let component: AltaStatusComponent;
  let fixture: ComponentFixture<AltaStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaStatusComponent ],
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
    fixture = TestBed.createComponent(AltaStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
