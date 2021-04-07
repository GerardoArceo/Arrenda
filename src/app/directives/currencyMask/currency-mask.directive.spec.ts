import { ElementRef } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { CurrencyMaskDirective } from './currency-mask.directive';

describe('CurrencyMaskDirective', () => {
  let component = new CurrencyMaskDirective();
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    })
      .compileComponents();
  }));

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});

export class MockElementRef extends ElementRef { }
