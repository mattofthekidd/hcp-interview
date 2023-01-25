import { TestBed } from '@angular/core/testing';

import { HcpserviceService } from './hcpservice.service';

describe('HcpserviceService', () => {
  let service: HcpserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HcpserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
