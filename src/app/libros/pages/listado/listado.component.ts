import { Component, OnInit } from '@angular/core';

import { LibrosService } from '../../services/libros.service';
import { Libro } from '../../interfaces/libro.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  libros: Libro[] = [];

  constructor(
    private librosService: LibrosService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.librosService.getLibros().subscribe((libros: Libro[]) => { this.libros = libros });
    console.log(this.authService.auth);
    console.log(this.authService.datosUsuario);
  }

}
