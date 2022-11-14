import { Libro } from "./libro.interface";

export interface Autor {
  id: number;
  nombre: string;
  apellido: string;
  descripcion: string;
  fechaNacimiento: string;
  sourceFoto: string;
  sourceBiografia: string;
  libros: Libro[];
}