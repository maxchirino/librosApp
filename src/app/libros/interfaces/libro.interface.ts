import { Autor } from "./autor.interface";

export interface Libro {
  id: number;
  titulo: string;
  sinopsis: string;
  urlIden: string;
  sourcePortada: string;
  fechaPublicacion: string;
  autores: Autor[];
}