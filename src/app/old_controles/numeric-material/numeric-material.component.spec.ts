import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NumericMaterialComponent } from './numeric-material.component';

describe('NumericMaterialComponent', () => {
  let component: NumericMaterialComponent;
  let fixture: ComponentFixture<NumericMaterialComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NumericMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
