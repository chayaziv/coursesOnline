import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('interceptor req:', req);

  const authToken = inject(AuthService).getToken();
  console.log('interceptor req:', req);

  if (authToken) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
  }
  console.log('interceptor req:', req);
  return next(req);
};
