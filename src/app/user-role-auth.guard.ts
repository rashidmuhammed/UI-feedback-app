import { CanActivateChildFn, Router } from '@angular/router';
import { UserAuthService } from './services/user-auth.service';
import { inject } from '@angular/core';

export const userRoleAuthGuard: CanActivateChildFn = (childRoute, state) => {
  const service = inject(UserAuthService);
  const router = inject(Router);
  if (service.getCurrentUserRole() === 'admin') {
    console.log(service.getCurrentUserRole());
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
