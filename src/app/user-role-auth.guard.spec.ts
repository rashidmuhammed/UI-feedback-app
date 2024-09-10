import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { userRoleAuthGuard } from './user-role-auth.guard';

describe('userRoleAuthGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userRoleAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
