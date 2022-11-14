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

  /* Obtener libro por Id */
  getLibroPorId(id: string): Observable<Libro> {
    const url: string = `${this.baseUrl}/libros/${id}`;
    return this.http.get<Libro>(url);
  }

  /* Obtener libro por título */
  buscarLibroPorTitulo(titulo: string): Observable<Libro[]> {
    const url: string = `${this.baseUrl}/libros/${titulo}`;
    return this.http.get<Libro[]>(url);
  }

  /* Obtener libro por id del autor */
  buscarLibroPorIdAutor(id: number): Observable<Libro[]> {
    const url: string = `${this.baseUrl}/libros/buscar-por-autor/${id}`;
    return this.http.get<Libro[]>(url);
  }

  /* Obtener libro nombre o apellido del autor */
  // buscarLibroPorAutor(termino: string): Observable<Libro[]> {
  //   const url: string = `${this.baseUrl}/libros/buscar-por-autor/${termino}`;
  //   return this.http.get<Libro[]>(url);
  // }

  /* Obtener todos los autores */
  getAutores(): Observable<Autor[]> {
    const url: string = `${this.baseUrl}/autores`;
    return this.http.get<Autor[]>(url);
  }

  /* Obtener autor por id */
  getAutorPorId(id: string): Observable<Autor> {
    const url: string = `${this.baseUrl}/autores/${id}`;
    return this.http.get<Autor>(url);
  }
}
