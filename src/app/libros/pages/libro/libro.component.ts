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
  comentarios: Comentario[] = [];
  idLibro: string = '';
  /* Biblioteca */
  libroAgregado: boolean = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private librosService: LibrosService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(param => this.librosService.getLibroPorId(param['id'])),
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
        // console.log(comentarios);
        this.comentarios = comentarios;
      });

    this.activatedRoute.params.subscribe(param => this.idLibro = param['id']);
    this.verificarSiEstaAgregado()
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

  agregarLibroABiblioteca() {
    const id: string = this.libro.id.toString();
    const token: string | null = localStorage.getItem('token');
    if (token && id) {
      this.librosService.agregarLibroABiblioteca(id, token).subscribe({
        next: () => {
          console.log('Libro agregado a biblioteca');
          this.libroAgregado = true;
        },
        error: () => {
          console.log('No se pudo agregar el libro');
        }
      })
    }
  }

  /* Esto lo uso para mantener el estado del botón, dependiendo si el libro está en la biblioteca o no */
  verificarSiEstaAgregado() {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      this.librosService.getBiblioteca(token).subscribe({
        next: (biblioteca: Libro[]) => {
          /* Si el libro está en la biblioteca, pongo la propiedad en true */
          this.libroAgregado = biblioteca.some(e => e.id === Number(this.idLibro));
        }
      })
    }
  }

  eliminarLibroDeBiblioteca() {
    const id: string = this.libro.id.toString();
    const token: string | null = localStorage.getItem('token');
    if (token && id) {
      this.librosService.borrarLibroDeBiblioteca(id, token).subscribe({
        next: () => {
          console.log('Libro borrado de la biblioteca');
          this.libroAgregado = false;
        }
      })
    }
  }
}
