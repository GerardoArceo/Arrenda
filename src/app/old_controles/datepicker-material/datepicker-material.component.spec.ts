import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DatepickerMaterialComponent } from './datepicker-material.component';

describe('DatepickerMaterialComponent', () => {
  let component: DatepickerMaterialComponent;
  let fixture: ComponentFixture<DatepickerMaterialComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
