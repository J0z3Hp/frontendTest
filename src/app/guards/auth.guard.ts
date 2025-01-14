import { CanActivateFn } from '@angular/router';
import { CredencialesAdminService } from '../services/login.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _credencialesAdminService = inject(CredencialesAdminService);
  const _router = inject(Router);

  // Validar si ya inició sesión o no
  if (!_credencialesAdminService.estaLogueado()) {
    _router.navigate(["/inicioSesion"]);
    return false;
  }

  // Validar si es administrador o no, si no es admin redireccionar a la pagina de inicio
  if (!_credencialesAdminService.esAdmin()) {
    _router.navigate(["/"]);
    return false;
  }
  
  return true;
};
