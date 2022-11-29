import { Component, OnInit } from '@angular/core';

import { Libro } from '../../interfaces/libro.interface';
import { LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-mi-biblioteca',
  templateUrl: './mi-biblioteca.component.html',
  styleUrls: ['./mi-biblioteca.component.css']
})
export class MiBibliotecaComponent implements OnInit {
  libros: Libro[] = [];
  bibliotecaVacia: boolean = true;

  constructor(private librosService: LibrosService) { }

  ngOnInit(): void {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      this.librosService.getBiblioteca(token).subscribe({
        next: (libros: Libro[]) => {
          this.libros = libros;
          this.bibliotecaVacia = false;
        },
        error: () => {
          this.bibliotecaVacia = true;
        }
      });
    }
  }

}
