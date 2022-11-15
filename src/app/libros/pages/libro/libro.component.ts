import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Libro } from '../../interfaces/libro.interface';
import { LibrosService } from '../../services/libros.service';
import { Comentario } from '../../interfaces/comentario.interface';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {

  libro!: Libro;
  cargado: boolean = false;
  sinopsisIzq: string = '';
  sinopsisDer: string = '';
  comentarios: Comentario[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private librosService: LibrosService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(param => this.librosService.getLibroPorId(param['id']))
      )
      .subscribe(libro => {
        this.libro = libro;
        this.cargado = true;
        this.sinopsisIzq = libro.sinopsis.substring(0, libro.sinopsis.length / 2);
        this.sinopsisDer = libro.sinopsis.substring(libro.sinopsis.length / 2);

      });

    this.activatedRoute.params
      .pipe(
        switchMap(param => this.librosService.getComentarios(param['id']))
      )
      .subscribe(comentarios => {
        console.log(comentarios);
        this.comentarios = comentarios;
      })
  }

  /* Función del botón de Leer más/Leer menos */
  leerMasLeerMenos() {
    let dots = document.getElementById("dots");
    let moreText = document.getElementById("more");
    let btnText = document.getElementById("myBtn");

    if (dots?.style.display === "none") {
      dots.style.display = "inline";
      btnText!.innerHTML = "Leer más";
      moreText!.style.display = "none";
    } else {
      dots!.style.display = "none";
      btnText!.innerHTML = "Leer menos";
      moreText!.style.display = "inline";
    }
  }
}
