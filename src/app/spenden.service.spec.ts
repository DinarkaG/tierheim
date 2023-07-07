import { TestBed } from '@angular/core/testing';

import { SpendenService } from './spenden.service';

describe('SpendenService', () => {
  let service: SpendenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpendenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
