import { Autor } from "./autor.interface";

export interface Libro {
  id: number;
  titulo: string;
  urlIden: string;
  sourcePortada: string;
  fechaPublicacion: string;
  autores: Autor[];
}