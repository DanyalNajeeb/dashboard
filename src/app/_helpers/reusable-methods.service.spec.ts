import { TestBed } from '@angular/core/testing';

import { ReusableMethodsService } from './reusable-methods.service';

describe('ReusableMethodsService', () => {
  let service: ReusableMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReusableMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
