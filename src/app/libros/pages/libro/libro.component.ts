import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Libro } from '../../interfaces/libro.interface';
import { LibrosService } from '../../services/libros.service';
import { Comentario } from '../../interfaces/comentario.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit, OnDestroy {

  libro!: Libro;
  cargado: boolean = false;
  sinopsisIzq: string = '';
  sinopsisDer: string = '';
  comentarios: Comentario[] = [];
  idLibro: string = '';
  /* Biblioteca */
  libroAgregado: boolean = false;

  /* Comentario */
  miComentario: FormGroup = this.fb.group({
    contenido: [, [Validators.required, Validators.minLength(1)]]
  });

  usuarioLogeado = {
    email: '',
    esAdmin: false
  }

  obs: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private librosService: LibrosService,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnDestroy() {
    if (this.obs) {
      this.obs.unsuscribe();
    }
  }

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
        this.comentarios.reverse(); /* Invierto el arreglo para que los comentarios recientes se muestren primero */
      });

    this.activatedRoute.params.subscribe(param => this.idLibro = param['id']);
    this.verificarSiEstaAgregado();

    const token: string | null = localStorage.getItem('token');
    if (token) {
      this.authService.getDatosUsuario(token).subscribe({
        next: (datosUsuario) => {
          this.usuarioLogeado = datosUsuario;
          // console.log(this.usuarioLogeado);
        }
      })
    }
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
        },
        error: (err) => {
          console.log(err);
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

  subirComentario() {
    if (this.miComentario.invalid) {
      this.miComentario.markAllAsTouched();
      return;
    }

    const id: string = this.libro.id.toString();
    const token: string | null = localStorage.getItem('token');
    if(token) {
      this.obs = this.librosService.agregarComentario(id, token, this.miComentario.value).subscribe({
        next: () => {
          window.location.reload();
        },
        error: () => {
          console.log('Error al tratar de agregar comentario');
        }
      });
    }
    this.miComentario.reset();
    
    // console.log(this.miComentario.controls['contenido'].value);
  }

  borrarComentario(idComent: number) {
    const idComentario = idComent.toString();
    const idLibro: string = this.libro.id.toString();
    const token: string | null = localStorage.getItem('token');
    if (token) {
      this.librosService.borrarComentario(idLibro, idComentario, token).subscribe({
        next: () => {
          console.log('Comentario borrado');
          window.location.reload();
        },
        error: () => {
          console.log('No se pudo borrar el comentario');
        }
      })
    }
  }
}
