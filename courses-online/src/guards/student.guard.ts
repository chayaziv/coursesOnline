import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const studentGuard: CanActivateFn = async (route, state) => {
 const authService = inject(AuthService);

   const role = await firstValueFrom(authService.role$);
   return role === 'student';
};
