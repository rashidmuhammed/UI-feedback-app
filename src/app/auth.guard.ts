import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  const userlogged = localStorage.getItem('accessToken');
  if (userlogged) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
