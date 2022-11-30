import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  /* Con esto prevengo que el usuario acceda a ciertas rutas si no está autenticado */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.auth.token || this.authService.verificarAutenticacion()) {
      return true;
    }
    console.log('Bloqueado por el AuthGuard (canActivate)');
    this.router.navigate(['./auth/login']);  
    return false;
  }

  /* 
    Con esto prevengo que el usuario cargue ciertos módulos si no está autenticado.
    Ojo: si el módulo ya se cargó, puede acceder a él. Por eso implementar solo esto no sirve, hay que implementar también el canLoad.
   */
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    /* 
      Verifico que exista el token al hacer la petición (que sea un usuario que existe). O que exista un token en el local storage (que se borra solo cuando toco 'Salir').
      Nota: no pregunto directamente si existe this.authService.auth porque al hacer la desestructuración en el getter, siempre va a existir un objeto (aunque no tenga la información necesaria).
    */
    if (this.authService.auth.token || this.authService.verificarAutenticacion()) {
      return true;
    }
    console.log('this.authService.auth.token: ', this.authService.auth.token);
    console.log('this.authService.verificarAutenticacion(): ', this.authService.verificarAutenticacion());
    console.log('Bloqueado por el AuthGuard (canLoad)');
    this.router.navigate(['./auth/login']);
    return false;
  }
}
