import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Auth } from '../interfaces/auth.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseURL;
  private _auth: Auth | undefined; /* Si tiene algún valor, el usuario está identificado */

  get auth(): Auth {
    return {...this._auth!};
  }

  constructor(private http: HttpClient) { }

  // verificarAutenticacion(): Observable<boolean> {
  //   /* Si no hay algún token almacenado en el local storage deniego el acceso */
  //   if (!localStorage.getItem('token')) {
  //     return of(false);
  //   }

  //   return this.http.get<Auth>()
  // }
}
