import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './../../login/login.component';
/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AltaVendorProgramComponent } from './alta-vendor-program.component';

describe('AltaVendorProgramComponent', () => {
  let component: AltaVendorProgramComponent;
  let fixture: ComponentFixture<AltaVendorProgramComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaVendorProgramComponent ],
      imports:[
        RouterTestingModule.withRoutes([
          { path: 'arrendadora/login',component: LoginComponent }   
        ]),
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        MaterialModule,
        ReactiveFormsModule, BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaVendorProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
