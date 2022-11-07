import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Libro } from '../interfaces/libro.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) {}

  /* Obtener todos los libros */
  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.baseUrl}/libros`);
  }

  /* Obtener libro individual por Id */
  getLibroPorId(id: string): Observable<Libro> {
    return this.http.get<Libro>(`${this.baseUrl}/libros/${id}`);
  }
}
