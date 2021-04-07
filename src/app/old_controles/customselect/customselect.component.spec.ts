import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomselectComponent } from './customselect.component';

describe('CustomselectComponent', () => {
  let component: CustomselectComponent;
  let fixture: ComponentFixture<CustomselectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
