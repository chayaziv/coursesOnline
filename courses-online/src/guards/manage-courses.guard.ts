import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const manageCoursesGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const role = await firstValueFrom(authService.role$);
  return role === 'admin' || role === 'teacher';
};
