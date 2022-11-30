import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
/* 
  pipe: combinar operadores.
  of: crear observables en base al argumento.  
  map: transformar lo que se recibe y retornar el nuevo valor.
*/

import { Auth } from '../interfaces/auth.interface';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatosUsuario } from '../interfaces/datosUsuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseURL;
  private _auth: Auth | undefined; /* Si tiene algún valor, el usuario está identificado */
  private _datosUsuario: DatosUsuario | undefined;

  /* Getter para obtener la propiedad auth (ya que la tengo privada) */
  get auth(): Auth {
    return {...this._auth!};
  }
  
  /* Getter para obtener la propiedad datosUsuario (ya que la tengo privada) */
  get datosUsuario(): DatosUsuario {
    return {...this._datosUsuario!};
  }

  constructor(private http: HttpClient) { }

  verificarAutenticacion(): boolean {
    if(!localStorage.getItem('token')) {
      return false;
    }

    return true;
  }

  getDatosUsuario(token: string): Observable<DatosUsuario> {
    const url: string = `${this.baseUrl}/cuentas/datosusuario`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };

    return this.http.get<DatosUsuario>(url, requestOptions).pipe(
      tap(datos => { this._datosUsuario = datos })
    );
  }

  login(body: any): Observable<Auth> {
    const url: string = `${this.baseUrl}/cuentas/login`;
    return this.http.post<Auth>(url, body).pipe(
      tap(auth => {
        this._auth = auth /* Pongo la respuesta en la propiedad local (token y expiracion) */
      }), 
      tap(auth => localStorage.setItem('token', auth.token)) /* Guardo el token en el local storage */
    );
  }

  logout() {
    this._auth = undefined;
    localStorage.removeItem('token');
  }

  register(body: any): Observable<Auth> {
    const url: string = `${this.baseUrl}/cuentas/registrar`;
    return this.http.post<Auth>(url, body);
  }
}