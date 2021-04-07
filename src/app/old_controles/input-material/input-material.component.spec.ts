import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InputMaterialComponent } from './input-material.component';

describe('InputMaterialComponent', () => {
  let component: InputMaterialComponent;
  let fixture: ComponentFixture<InputMaterialComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InputMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
