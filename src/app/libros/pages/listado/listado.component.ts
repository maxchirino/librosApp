import { Component, OnInit } from '@angular/core';

import { LibrosService } from '../../services/libros.service';
import { Libro } from '../../interfaces/libro.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  libros: Libro[] = [];

  constructor(private librosService: LibrosService) { }

  ngOnInit(): void {
    this.librosService.getLibros().
      subscribe((libros: Libro[]) => {
        this.libros = libros
        // console.log(libros);
      });
  }

}
