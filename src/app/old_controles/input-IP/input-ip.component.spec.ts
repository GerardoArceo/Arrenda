import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InputIPComponent } from './input-ip.component';

describe('InputIPComponent', () => {
  let component: InputIPComponent;
  let fixture: ComponentFixture<InputIPComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InputIPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputIPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
