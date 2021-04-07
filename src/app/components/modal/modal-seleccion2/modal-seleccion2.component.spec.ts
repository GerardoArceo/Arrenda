import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ModalSeleccion2Component } from './modal-seleccion2.component';

describe('ModalSeleccion2Component', () => {
  let component: ModalSeleccion2Component;
  let fixture: ComponentFixture<ModalSeleccion2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSeleccion2Component],
      imports: [MatDialogModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA, useValue: {
            btnCancelText: '',
            btnAcceptText: ''
          }
        },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSeleccion2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('test tableselection', () => {

  //   expect(component.tableSelection(null)).toBeUndefined();
  // });
});
