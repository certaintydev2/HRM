import { TestBed } from '@angular/core/testing';

import { CompanypoliciesService } from './companypolicies.service';

describe('CompanypoliciesService', () => {
  let service: CompanypoliciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanypoliciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
