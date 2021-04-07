import { TestBed } from '@angular/core/testing';

import { ModelService } from './model.service';

describe('ModelService', () => {
  let service: ModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test setData', () => {
    expect(service.setData('1')).toBeUndefined();
  });

  it('test getData', () => {
    service.setData('1');
    expect(service.getData()).toEqual('1');
  });

});
