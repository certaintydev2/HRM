import { TestBed } from '@angular/core/testing';

import { TokenguardGuard } from './tokenguard.guard';

describe('TokenguardGuard', () => {
  let guard: TokenguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TokenguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
