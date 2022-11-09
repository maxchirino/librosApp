import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Libro } from '../interfaces/libro.interface';
import { environment } from '../../../environments/environment';
import { Autor } from '../interfaces/autor.interface';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) {}

  /* Obtener todos los libros */
  getLibros(): Observable<Libro[]> {
    const url: string = `${this.baseUrl}/libros`;
    return this.http.get<Libro[]>(url);
  }

  /* Obtener libro individual por Id */
  getLibroPorId(id: string): Observable<Libro> {
    const url: string = `${this.baseUrl}/libros/${id}`;
    return this.http.get<Libro>(url);
  }

  /* Buscar libro por título */
  buscarLibroPorTitulo(titulo: string): Observable<Libro[]> {
    const url: string = `${this.baseUrl}/libros/${titulo}`;
    return this.http.get<Libro[]>(url);
  }

  /* Buscar autor (por nombre o apellido) */
  getAutorPorId(id: string): Observable<Autor> {
    const url: string = `${this.baseUrl}/autores/${id}`;
    return this.http.get<Autor>(url);
  }
}
