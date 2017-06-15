import { TestBed, async, inject } from '@angular/core/testing';

import { UserIdentityGuard } from './user-identity.guard';

describe('UserIdentityGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserIdentityGuard]
    });
  });

  it('should ...', inject([UserIdentityGuard], (guard: UserIdentityGuard) => {
    expect(guard).toBeTruthy();
  }));
});
