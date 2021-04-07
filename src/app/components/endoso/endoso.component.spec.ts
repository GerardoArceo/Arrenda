import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { EndosoComponent } from './endoso.component';

describe('EndosoComponent', () => {
  let component: EndosoComponent;
  let fixture: ComponentFixture<EndosoComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EndosoComponent ],
      imports:[
        RouterTestingModule.withRoutes([
          { path: 'arrendadora/login',component: LoginComponent }         
        ]),
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule
       ]
    })
    .compileComponents();
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});