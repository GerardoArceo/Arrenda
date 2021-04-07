import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogService } from 'src/app/servicios/dialog/dialog.service';
import { MaterialModule } from 'src/app/utilities/material-module';
import { ErrorsComponent } from '../errors/errors.component';

import { CustomselectComponent } from './customselect.component';

describe('CustomselectComponent', () => {
  let component: CustomselectComponent;
  let fixture: ComponentFixture<CustomselectComponent>;
  let dialogService:DialogService;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ CustomselectComponent, ErrorsComponent ],
      imports:[
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
      ]
    })
    .compileComponents();
    dialogService=TestBed.inject(DialogService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
