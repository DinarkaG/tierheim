import { TestBed } from '@angular/core/testing';

import { KleintierService } from './kleintier.service';

describe('KleintierService', () => {
  let service: KleintierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KleintierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
