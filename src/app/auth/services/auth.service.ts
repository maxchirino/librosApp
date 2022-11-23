import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
/* 
  pipe: combinar operadores.
  of: crear observables en base al argumento.  
  map: transformar lo que se recibe y retornar el nuevo valor.
*/

import { Auth } from '../interfaces/auth.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseURL;
  private _auth: Auth | undefined; /* Si tiene algún valor, el usuario está identificado */

  /* Getter para obtener la propiedad auth (ya que la tengo privada) */
  get auth(): Auth {
    return {...this._auth!};
  }

  constructor(private http: HttpClient) { }

  verificarAutenticacion(): boolean {
    if(!localStorage.getItem('token')) {
      return false;
    }

    return true;
  }

  login(body:any): Observable<Auth> {
    const url: string = `${this.baseUrl}/cuentas/login`;
    return this.http.post<Auth>(url, body).pipe(
      tap(auth => this._auth = auth), /* Pongo la respuesta en la propiedad local */
      tap(auth => localStorage.setItem('token', auth.token)) /* Guardo el token en el local storage */
    );
  }

  logout() {
    this._auth = undefined;
    localStorage.removeItem('token');
  }
}
