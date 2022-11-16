import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LibrosRoutingModule } from './libros-routing.module';
import { ListadoComponent } from './pages/listado/listado.component';
import { LibroComponent } from './pages/libro/libro.component';
import { PorTituloComponent } from './pages/por-titulo/por-titulo.component';
import { PorAutorComponent } from './pages/por-autor/por-autor.component';
import { AutorComponent } from './pages/autor/autor.component';
import { AutoresComponent } from './pages/autores/autores.component';
import { AutorPorNombreComponent } from './pages/autor-por-nombre/autor-por-nombre.component';
import { AutorPorApellidoComponent } from './pages/autor-por-apellido/autor-por-apellido.component';
import { AutorPorNombreOApellidoComponent } from './pages/autor-por-nombre-o-apellido/autor-por-nombre-o-apellido.component';
import { LibroAnimadoComponent } from './components/libro-animado/libro-animado.component';
import { ResultadoAutorComponent } from './components/resultado-autor/resultado-autor.component';


@NgModule({
  declarations: [
    ListadoComponent,
    LibroComponent,
    PorTituloComponent,
    PorAutorComponent,
    AutorComponent,
    AutoresComponent,
    AutorPorNombreComponent,
    AutorPorApellidoComponent,
    AutorPorNombreOApellidoComponent,
    LibroAnimadoComponent,
    ResultadoAutorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    LibrosRoutingModule
  ]
})
export class LibrosModule { }
