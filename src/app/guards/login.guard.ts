import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (localStorage.getItem("token") != null) {
    router.navigate(["/motus"]);
    return false;
  }
  return true;
};
