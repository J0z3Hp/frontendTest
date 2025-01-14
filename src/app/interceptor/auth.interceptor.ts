import { HttpInterceptorFn } from '@angular/common/http';
import { CredencialesAdminService } from '../services/login.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    // 1. Inyectar el servicio
    const _credencialesAdminService = inject(CredencialesAdminService);

    // 2. Declarar las variables que se necesiten
    // Aca obtengo el token 
    const token = _credencialesAdminService.obtenerToken();
  
    const tokenReq = token ?
      req.clone({ setHeaders: { Authorization: "Bearer " + token } })
      : req; 
  
    return next(tokenReq);
};
