import { LoginComponent } from './../../login/login.component';
import { TiposBienComponent } from './../tipos-bien.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AltaTiposBienComponent } from './alta-tipos-bien.component';

describe('AltaTiposBienComponent', () => {
  let component: AltaTiposBienComponent;
  let fixture: ComponentFixture<AltaTiposBienComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaTiposBienComponent ],
      imports:[
        RouterTestingModule.withRoutes([
          { path: 'arrendadora/tipos-bien',component: TiposBienComponent }   
        ]),
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule,        
        BrowserAnimationsModule
      ],
      providers: [
        {provide: FormBuilder, useValue: formBuilder}
      ]
    })
    .compileComponents();
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaTiposBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
