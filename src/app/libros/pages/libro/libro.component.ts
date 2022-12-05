import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, Subscription } from 'rxjs';

import { Libro } from '../../interfaces/libro.interface';
import { LibrosService } from '../../services/libros.service';
import { Comentario } from '../../interfaces/comentario.interface';
import { AuthService } from '../../../auth/services/auth.service';

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
  idLibro: string = '';
  
  /* Biblioteca */
  libroAgregado: boolean = false;
  
  /* Comentarios */
  comentarios: Comentario[] = [];
  miComentario: FormGroup = this.fb.group({
    contenido: [, [Validators.required, Validators.minLength(1)]]
  });

  comentarioActualizado: FormGroup = this.fb.group({
    contenido: [, [Validators.required, Validators.minLength(1)]]
  })

  /* Información del usuario logeado */
  usuarioLogeado = {
    email: '',
    esAdmin: false
  }

  /* Token */
  token: string | null = localStorage.getItem('token');

  constructor(
    private activatedRoute: ActivatedRoute,
    private librosService: LibrosService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  subscripcionComentarios!: any;

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
        this.comentarios = comentarios;
        this.comentarios.forEach(c => c.mostrar = true);
        this.comentarios.reverse(); /* Invierto el arreglo para que los comentarios recientes se muestren primero */
      });

    this.activatedRoute.params.subscribe(param => this.idLibro = param['id']);

    this.verificarSiEstaAgregado();

    if (this.token) {
      this.authService.getDatosUsuario(this.token).subscribe({
        next: (datosUsuario) => {
          this.usuarioLogeado = datosUsuario;
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

  /* Agregar libro a la biblioteca personal */
  agregarLibroABiblioteca() {
    if (this.token && this.idLibro) {
      this.librosService.agregarLibroABiblioteca(this.idLibro, this.token).subscribe({
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
    if (this.token) {
      this.librosService.getBiblioteca(this.token).subscribe({
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

  /* Eliminar libro de la biblioteca personal */
  eliminarLibroDeBiblioteca() {
    if (this.token && this.idLibro) {
      this.librosService.borrarLibroDeBiblioteca(this.idLibro, this.token).subscribe({
        next: () => {
          console.log('Libro borrado de la biblioteca');
          this.libroAgregado = false;
        }
      })
    }
  }

  /* Publicar un comentario */
  subirComentario() {
    if (this.miComentario.invalid) {
      this.miComentario.markAllAsTouched();
      return;
    }
    
    if(this.token) {
      this.librosService.agregarComentario(this.idLibro, this.token, this.miComentario.value).subscribe({
        next: () => {
          // window.location.reload();
          this.reloadCurrentRoute();
        },
        error: () => {
          console.log('Error al tratar de agregar comentario');
        }
      });
    }
    this.miComentario.reset();
  }

  // /* Eliminar un comentario publicado por el usuario */
  borrarComentario(idComent: number) {
    const idComentario = idComent.toString();
    if (this.token) {
      this.librosService.borrarComentario(this.idLibro, idComentario, this.token).subscribe({
        next: () => {
          window.location.reload();
          /* No uso la funcion reloadCurrentRoute porque se queda colgado el modal de Bootstrap */
          // this.reloadCurrentRoute();
        },
        error: () => {
          console.log('No se pudo borrar el comentario');
        }
      })
    }
  }

  comentarioABorrar: Comentario = {
    id: -1,
    contenido: '',
    usuario: ''
  };

  guardarComentarioABorrar(comentario: Comentario) {
    this.comentarioABorrar = comentario;
  }

  /* Editar un comentario publicado por el usuario */
  editarComentario(idComent: number, indexComentario: number) {
    if (this.comentarioActualizado.invalid) {
      this.comentarioActualizado.markAllAsTouched();
      return;
    }
    const idComentario: string = idComent.toString();
    if (this.token) {
      this.librosService.editarComentario(this.idLibro, idComentario, this.token, this.comentarioActualizado.value).subscribe({
        next: () => {
          /* Vuelvo a mostrar el comentario */
          this.comentarios[indexComentario].mostrar = true;
          // window.location.reload();
          // this.ngOnInit();
          this.reloadCurrentRoute();
        },
        error: () => {
          console.log('No se pudo editar el comentario');
          this.comentarios[indexComentario].mostrar = true;
        }
      })
    }
    this.miComentario.reset();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
}

  ocultarComentario(indexComentarioAOcultar: number) {
    /* Oculto únicamente el comentario a editar */
    if (this.comentarios[indexComentarioAOcultar].mostrar) {
      this.comentarios[indexComentarioAOcultar].mostrar = false;
      this.comentarioActualizado.setValue({
        contenido: this.comentarios[indexComentarioAOcultar].contenido
      });
      return;
    }
    this.comentarios[indexComentarioAOcultar].mostrar = true;
  }

}
