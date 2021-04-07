import { LoginComponent } from './../login/login.component';
//import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MaterialModule } from 'src/app/material-module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TiposBienComponent } from './tipos-bien.component';
import { Router, ActivatedRoute} from '@angular/router';

describe('TiposBienComponent', () => {
  let component: TiposBienComponent;
  let fixture: ComponentFixture<TiposBienComponent>;
  let router: Router;
  let activateroute: ActivatedRoute;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposBienComponent ],
      imports:[
        BrowserAnimationsModule,
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
    activateroute = TestBed.inject(ActivatedRoute);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
