import { TestBed } from '@angular/core/testing';

import { StateLookUpService } from './state-look-up.service';

describe('StateLookUpService', () => {
  let service: StateLookUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateLookUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
