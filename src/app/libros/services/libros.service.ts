import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Libro } from '../interfaces/libro.interface';
import { environment } from '../../../environments/environment';
import { Autor } from '../interfaces/autor.interface';
import { Comentario } from '../interfaces/comentario.interface';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) {}

  /* ----------------------- LIBROS ----------------------- */
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
  buscarLibroPorAutor(termino: string): Observable<(Libro[])[]> {
    const url: string = `${this.baseUrl}/libros/buscar-por-autor/${termino}`;
    return this.http.get<(Libro[])[]>(url);
  }

  /* ----------------------- AUTORES ----------------------- */

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

  /* Obtener autor por nombre */
  buscarAutorPorNombre(nombre: string): Observable<Autor[]> {
    // console.log(nombre);
    const url: string = `${this.baseUrl}/autores/nombre/${nombre}`;
    return this.http.get<Autor[]>(url);
  }

  /* Obtener autor por apellido */
  buscarAutorPorApellido(apellido: string): Observable<Autor[]> {
    const url: string = `${this.baseUrl}/autores/apellido/${apellido}`;
    return this.http.get<Autor[]>(url);
  }

  /* Obtener autor por nombre o apellido */
  buscarAutorPorNombreOApellido(nombreOApellido: string): Observable<Autor[]> {
    const url: string = `${this.baseUrl}/autores/buscar/${nombreOApellido}`;
    return this.http.get<Autor[]>(url);
  }

  /* Ordenar autores */
  ordenarAutores(ordenarPor: string, tipoOrden: string): Observable<Autor[]> {
    const url: string = `${this.baseUrl}/autores/${ordenarPor}/${tipoOrden}`;
    return this.http.get<Autor[]>(url);
  }

  /* ----------------------- COMENTARIOS ----------------------- */

  /* Obtener todos los comentarios */
  getComentarios(idLibro: string): Observable<Comentario[]> {
    const url: string = `${this.baseUrl}/libros/${idLibro}/comentarios`;
    return this.http.get<Comentario[]>(url);
  }

  /* Agregar un comentario */
  agregarComentario(id: string, token: string, comentario: any) {
    const url: string = `${this.baseUrl}/libros/${id}/comentarios`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };
    return this.http.post(url, comentario, requestOptions);
  }

  /* Borrar un comentario */
  borrarComentario(idLibro: string, idComentario: string, token: string) {
    const url: string = `${this.baseUrl}/libros/${idLibro}/comentarios/${idComentario}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };
    return this.http.delete(url, requestOptions);
  }

  /* ----------------------- BIBLIOTECA ----------------------- */

  /* Obtener la biblioteca del usuario logeado */
  getBiblioteca(token: string): Observable<Libro[]> {
    const url: string = `${this.baseUrl}/bibliotecas`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };
    return this.http.get<Libro[]>(url, requestOptions);
  }

  agregarLibroABiblioteca(id: string, token: string) {
    const url: string = `${this.baseUrl}/bibliotecas/agregarLibro/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };
    return this.http.post(url, null, requestOptions);
  }

  borrarLibroDeBiblioteca(id: string, token: string) {
    const url: string = `${this.baseUrl}/bibliotecas/borrar/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };
    return this.http.delete(url, requestOptions);
  }
}
