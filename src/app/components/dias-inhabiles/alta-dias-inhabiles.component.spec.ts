import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material-module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './../login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AltaDiasInhabilesComponent } from './alta-dias-inhabiles.component';


describe('AltaDiasInhabilesComponent', () => {
  let component: AltaDiasInhabilesComponent;
  let fixture: ComponentFixture<AltaDiasInhabilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaDiasInhabilesComponent ],
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
    fixture = TestBed.createComponent(AltaDiasInhabilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
