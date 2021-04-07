import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './../login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material-module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { diasinhabilesComponent } from './dias-inhabiles.component';

describe('diasinhabilesComponent', () => {
  let component: diasinhabilesComponent;
  let fixture: ComponentFixture<diasinhabilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ diasinhabilesComponent ],
      imports:[
        RouterTestingModule.withRoutes([
          { path: 'arrendadora/login',component: LoginComponent }   
        ]),
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(diasinhabilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
