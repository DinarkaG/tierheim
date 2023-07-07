import { TestBed } from '@angular/core/testing';

import { HundService } from './hund.service';

describe('HundService', () => {
  let service: HundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
