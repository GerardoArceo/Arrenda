import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './../login/login.component';
import { MaterialModule } from 'src/app/material-module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AltaCaracteristicasComponent } from './alta-caracteristicas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

describe('AltaCaracteristicasComponent', () => {
  let component: AltaCaracteristicasComponent;
  let fixture: ComponentFixture<AltaCaracteristicasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaCaracteristicasComponent ],
      imports:[
        RouterTestingModule.withRoutes([
          { path: 'arrendadora/login',component: LoginComponent }   
        ]),
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        MaterialModule,
        ReactiveFormsModule, BrowserAnimationsModule, CommonModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaCaracteristicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
